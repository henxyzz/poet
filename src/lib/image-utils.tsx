export async function dataUrlToFile(dataUrl: string, fileName: string): Promise<File | null> {
  try {
    const res = await fetch(dataUrl);
    const blob = await res.blob();
    return new File([blob], fileName, { type: blob.type });
  } catch (error) {
    console.error("Error converting data URL to File:", error);
    return null;
  }
}
