import { JournalEntry } from '../types/healing';
import { loadData, saveData } from './storage';

const JOURNAL_KEY = 'butterfly_journal';

export async function getJournal(): Promise<JournalEntry[]> {
  const journal = await loadData<JournalEntry[]>(JOURNAL_KEY);
  return journal ?? [];
}

export async function addJournalEntry(entry: JournalEntry): Promise<void> {
  const current = await getJournal();

  current.unshift(entry);

  await saveData(JOURNAL_KEY, current);
}

export async function clearJournal(): Promise<void> {
  await saveData(JOURNAL_KEY, []);
}