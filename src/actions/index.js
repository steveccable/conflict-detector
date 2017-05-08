import { signInWithGithub, signOutOfGithub } from './auth';
import { setFirebaseApp } from './firebaseInit';
import { fetchPrs } from './github';

export {
  /* auth         */ signInWithGithub, signOutOfGithub,
  /* firebaseInit */ setFirebaseApp,
  /* github       */ fetchPrs
}
