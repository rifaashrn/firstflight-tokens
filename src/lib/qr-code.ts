import QRCode from 'qrcode'

export async function generateQRCode(text: string): Promise<string> {
  try {
    return await QRCode.toDataURL(text)
  } catch (err) {
    console.error('QR Code generation failed:', err)
    throw err
  }
}