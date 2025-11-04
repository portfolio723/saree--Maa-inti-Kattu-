'use client';
    
import {
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  CollectionReference,
  DocumentReference,
  SetOptions,
  WriteBatch,
} from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import {FirestorePermissionError} from '@/firebase/errors';

/**
 * Initiates a setDoc operation for a document reference.
 * Does NOT await the write operation internally.
 */
export function setDocumentNonBlocking(docRef: DocumentReference, data: any, options?: SetOptions) {
  const promise = options ? setDoc(docRef, data, options) : setDoc(docRef, data);
  promise.catch(error => {
    errorEmitter.emit(
      'permission-error',
      new FirestorePermissionError({
        path: docRef.path,
        operation: options && 'merge' in options ? 'update' : 'create',
        requestResourceData: data,
      })
    )
  });
  return promise;
}


/**
 * Initiates an addDoc operation for a collection reference.
 * Does NOT await the write operation internally.
 * Returns the Promise for the new doc ref, but typically not awaited by caller.
 */
export function addDocumentNonBlocking(colRef: CollectionReference | DocumentReference, data: any) {
  let promise;
  let path;
  let operation;

  if (colRef.type === 'collection') {
      promise = addDoc(colRef, data);
      path = colRef.path;
      operation = 'create' as const;
  } else {
      promise = setDoc(colRef, data);
      path = colRef.path;
      operation = 'create' as const;
  }
  
  promise.catch(error => {
      errorEmitter.emit(
        'permission-error',
        new FirestorePermissionError({
          path: path,
          operation: operation,
          requestResourceData: data,
        })
      )
    });
  return promise;
}


/**
 * Initiates an updateDoc operation for a document reference.
 * Does NOT await the write operation internally.
 */
export function updateDocumentNonBlocking(docRef: DocumentReference, data: any) {
  updateDoc(docRef, data)
    .catch(error => {
      errorEmitter.emit(
        'permission-error',
        new FirestorePermissionError({
          path: docRef.path,
          operation: 'update',
          requestResourceData: data,
        })
      )
    });
}


/**
 * Initiates a deleteDoc operation for a document reference.
 * Does NOT await the write operation internally.
 */
export function deleteDocumentNonBlocking(docRef: DocumentReference) {
  deleteDoc(docRef)
    .catch(error => {
      errorEmitter.emit(
        'permission-error',
        new FirestorePermissionError({
          path: docRef.path,
          operation: 'delete',
        })
      )
    });
}

/**
 * Commits a WriteBatch operation.
 * Does NOT await the commit operation internally.
 */
export function commitBatchNonBlocking(batch: WriteBatch) {
    batch.commit().catch(error => {
        // Generic error for batch operations as we don't know the exact failed operation
        console.error("Batch write failed:", error);
         errorEmitter.emit(
            'permission-error',
            new FirestorePermissionError({
                path: 'batch operation',
                operation: 'write',
            })
        )
    });
}
