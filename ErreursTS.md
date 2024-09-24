# Erreurs TypeScript

1. **Unused Import**:

   - **Fichier**: `src/components/partials/MapComponent.tsx`
   - **Ligne**: 11
   - **Message**: `'UserTypeInfo' is declared but its value is never read.`
     import UserTypeInfo from './UserTypeInfo';

2. **Type 'string' is not assignable to type 'number'**:

   - **Fichier**: `src/components/partials/MapComponent.tsx`
   - **Ligne**: 70
   - **Message**: `Type 'string' is not assignable to type 'number | LatLngTuple'.`
     bounds.extend([animal.creator.latitude, animal.creator.longitude]);

3. **Type 'LatLngLiteral | LatLngTuple | [string, string]' is not assignable**:

   - **Fichier**: `src/components/partials/MapComponent.tsx`
   - **Ligne**: 106
   - **Message**: `Type '[string, string]' is not assignable to type 'LatLngTuple'.`
     const animalPosition: LatLngExpression = animal ? [animal.creator.latitude, animal.creator.longitude] : defaultPosition;

4. **Type 'User[] | null | undefined' is not assignable to type 'User[] | null'**:

   - **Fichier**: `src/components/partials/MapComponent.tsx`
   - **Ligne**: 235
   - **Message**: `Type 'undefined' is not assignable to type 'User[] | null'.`
     <FitMapToBounds users={filteredUsers} animal={animal} location={location} />

5. **Unused Import**:

   - **Fichier**: `src/components/pages/TrouverAnimal.tsx`
   - **Ligne**: 6
   - **Message**: `'useRef' is declared but its value is never read.`
     useRef,

6. **Unused Variable**:

   - **Fichier**: `src/components/pages/TrouverAnimal.tsx`
   - **Ligne**: 48
   - **Message**: `'numChildren' is declared but its value is never read.`
     const [numChildren, setNumChildren] = useState<number>(0);

7. **Property 'children' does not exist on type 'never'**:

   - **Fichier**: `src/components/pages/TrouverAnimal.tsx`
   - **Ligne**: 52
     return divRef.current.children.length;

8. **Unused Variable**:

   - **Fichier**: `src/components/pages/TrouverAnimal.tsx`
   - **Ligne**: 82
   - **Message**: `'loadingUsers' is declared but its value is never read.`
     const [loadingUsers, setLoadingUsers] = useState<boolean>(true);

9. **Property 'animal' is missing in type**:

   - **Fichier**: `src/components/pages/TrouverAnimal.tsx`
   - **Ligne**: 331
     <MapComponent users={allUsers} />

10. **Property 'onerror' does not exist on type 'EventTarget'**:

    - **Fichier**: `src/components/partials/InterlocutorItemList.tsx`
    - **Ligne**: 43
      e.target.onerror = null;

11. **Property 'fetchDisscussion' does not exist on type**:

    - **Fichier**: `src/components/formulaires/ContactUserMessagerieForm.tsx`
    - **Ligne**: 13
      fetchDisscussion,

12. **Parameter 'e' implicitly has an 'any' type**:

    - **Fichier**: `src/components/formulaires/ContactUserMessagerieForm.tsx`
    - **Ligne**: 52
      const handleSubmit = async (e) => {

13. **Parameter 'item' implicitly has an 'any' type**:

    - **Fichier**: `src/components/partials/Messagerie.tsx`
    - **Ligne**: 85
      interlocutorsLastMessage.map((item) => (

14. **Type 'number | undefined' is not assignable to type 'number | null'**:

    - **Fichier**: `src/components/partials/Messagerie.tsx`
    - **Ligne**: 117
      senderId={connectedUser?.userId}

15. **Module not found**:

    - **Fichier**: `src/components/pages/Accueil.tsx`
    - **Ligne**: 9
    - **Message**: `Could not find a declaration file for module 'react-helmet'.`
      import { Helmet } from 'react-helmet';

16. **Unused Variable**:

    - **Fichier**: `src/components/pages/Accueil.tsx`
    - **Ligne**: 36
      const [loading, setLoading] = useState(true);

17. **Type '{ users: any; }' is missing properties**:

    - **Fichier**: `src/components/pages/Accueil.tsx`
    - **Ligne**: 173
      <MapComponent users={allUsers} />

18. **Unused Import**:

    - **Fichier**: `src/components/pages/MesAnimaux.tsx`
    - **Ligne**: 9
      import { UserAnimal } from 'src/@interfaces/userAnimals';

19. **Could not find module 'react-helmet'**:

    - **Fichier**: `src/components/pages/MesAnimaux.tsx`
    - **Ligne**: 10
      import { Helmet } from 'react-helmet';

20. **Property 'pending' does not exist on type**:

    - **Fichier**: `src/components/pages/MesDemandes.tsx`
    - **Ligne**: 42
      ordreDesEtats[a.request_status as Etats]

21. **Unused Variable**:

    - **Fichier**: `src/components/pages/Contact.tsx`
    - **Ligne**: 1
      import { useState } from 'react';

22. **Type 'File | null' is not assignable to parameter**:

    - **Fichier**: `src/components/formulaires/UploadImageForm.tsx`
    - **Ligne**: 56
      formData.append('image', image);

23. **'animal' is possibly 'null'**:

    - **Fichier**: `src/components/pages/ProfilAnimal.tsx`
    - **Ligne**: 244
    <Link to={`/profil/${animal.animalOwners[0].user.id}`}>

24. **Unused Import**:
    - **Fichier**: `src/components/pages/ProfilAnimal.tsx`
    - **Ligne**: 8
      import { UserAnimal } from 'src/@interfaces/userAnimals';
