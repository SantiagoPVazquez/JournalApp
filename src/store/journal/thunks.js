import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { savingNewNote, addNewEmptyNote, setActiveNote, setNotes, setSaving, updateNote, setPhotosToActiveNote, clearNotesLogout, deleteNoteById } from "./";
import { fileUpload, loadNotes } from "../../helpers";
import { logoutFirebase } from "../../firebase/providers";
import { logout } from "../auth";



export const startNewNote = () => {
    return async( dispatch, getState ) => {

        dispatch(savingNewNote());

        const {uid} = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),

        }

        const newDoc = doc( collection( FirebaseDB, `${uid}/journal/notes` ));
        await setDoc(newDoc, newNote)

        newNote.id = newDoc.id

        dispatch( addNewEmptyNote( newNote ) );
        dispatch( setActiveNote( newNote ) );

    }
}

export const startLoadingNotes = () => {
    return async ( dispatch, getState ) => {

        const {uid} = getState().auth;

        const notes = await loadNotes(uid);
        
        dispatch( setNotes( notes ) );

    }
}

export const startSaveNote = () => {
    return async(dispatch, getState) => {

        dispatch(setSaving());

        const {uid} = getState().auth;
        const {activeNote} = getState().journal;

        const noteToFireStore = {...activeNote};
        delete noteToFireStore.id;

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${activeNote.id}`);
        await setDoc(docRef, noteToFireStore, {merge: true});

        dispatch(updateNote(activeNote));

    }
}

export const startUploadingFiles = (files = []) => {
    return async () => {
        dispatch(setSaving())
        
        const fileUploadPromises = [];
        for (const file of files) {
            fileUploadPromises.push(fileUpload(file))
        }

        const photosUrls = await Promise.all(fileUploadPromises);

        dispatch(setPhotosToActiveNote(photosUrls));

    }
}


export const startLogout = () => {
    return async( dispatch ) => {
        await logoutFirebase();
        dispatch(clearNotesLogout());
        dispatch(logout())

    }
}

export const startDeletingNote = () => {
    return async(dispatch, getState) => {
        const {uid} = getState().auth;
        const {activeNote} = getState().journal;

        const docRef = doc( FirebaseDB, `${uid}/journal/notes/${activeNote.id}` );

        const resp = await deleteDoc(docRef);

        dispatch(deleteNoteById(activeNote.id));
    }
}