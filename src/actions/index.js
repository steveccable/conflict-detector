import { signInWithGithub } from './auth';
import { setFirebaseApp } from './firebaseInit';
import { fetchPrs } from './github';

export {
  /* auth         */ signInWithGithub,
  /* firebaseInit */ setFirebaseApp,
  /* github       */ fetchPrs
}
