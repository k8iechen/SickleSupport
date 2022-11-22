import { Timestamp } from 'firebase/firestore';
import PainEntryStore, { IBackend } from './PainEntry';

import type { TPainEntry } from '../models/PainEntry';
import type { TPatient } from '../models/Patient';

// TODO: move this to models/test/Patient.ts
const fakePatient = (): TPatient => ({
  uid: 'uid',
  name: 'name',
});
const fakePainEntry = (): TPainEntry => ({
  created_at: Timestamp.fromMillis(42),
  updated_at: Timestamp.fromMillis(1024),
  pain_intensity: 0,
  medication_taken: false,
  tylenols_taken: 0,
  anti_inflammatories_taken: 0,
  short_acting_opiods_taken: 0,
  long_acting_opiods_taken: 0,
  location: 'location',
  pain_triggers: [],
  relief_methods: [],
  hospital_visit: false,
  notes: 'notes',
});

test('addEntry will forward to backend', async () => {
  const backend = {
    addEntry: jest.fn(),
  } as IBackend;

  const store = PainEntryStore(backend);

  const patient = fakePatient();
  const data = fakePainEntry();

  const success = await store.addEntry(patient, data);
  expect(success).toBeTruthy();

  expect(backend.addEntry).toHaveBeenCalledWith(expect.anything(), data);
});
