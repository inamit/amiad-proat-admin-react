import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig.js';

const gradesCollectionName = 'grades';

export const getGrades = async () => {
  const gradesSnapshot = await getDocs(collection(db, gradesCollectionName));

  return gradesSnapshot.docs
    .map((doc) => ({ label: doc.get('label'), value: parseInt(doc.id) }))
    .sort((first, second) => first.value - second.value);
};
