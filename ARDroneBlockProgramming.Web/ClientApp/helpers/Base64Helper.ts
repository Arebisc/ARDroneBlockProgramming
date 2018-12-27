export function toBase64 (u8: Uint8Array): string {
    return btoa(String.fromCharCode.apply(null, u8));
}