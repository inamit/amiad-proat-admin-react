import { getDocs, collection } from 'firebase/firestore';
import { db } from 'firebaseConfig';
import { EnumValue } from 'models/enums/enum';

const groupsCollectionName = 'groups';

export const getGroupsForSelect = async (): Promise<EnumValue<string>[]> => {
  const groupsSnapshot = await getDocs(collection(db, groupsCollectionName));

  return groupsSnapshot.docs.map((doc) => ({
    value: doc.id,
    label: doc.get('name')
  }));
};
