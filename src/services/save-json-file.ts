import { File, Paths } from 'expo-file-system';
import * as Sharing from 'expo-sharing';

/**
 * Write JSON to a file and open the share sheet so the farmer can save or send it.
 * Returns false if sharing isn't available on this device.
 */
export async function saveJsonFile(fileName: string, data: unknown): Promise<boolean> {
  const file = new File(Paths.cache, fileName);
  file.create({ overwrite: true });
  await file.write(JSON.stringify(data, null, 2));

  if (!(await Sharing.isAvailableAsync())) return false;
  await Sharing.shareAsync(file.uri, {
    mimeType: 'application/json',
    UTI: 'public.json',
    dialogTitle: 'Save your AgriTrust data',
  });
  return true;
}
