import { useContext } from 'react';
import { ProfileContext } from 'src/contexts/profile-context';

export const useProfile = () =>  useContext(ProfileContext);

console.log('hello',useProfile);

