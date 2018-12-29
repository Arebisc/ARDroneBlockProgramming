export function toBase64 (u8: Uint8Array): string {

    let blob = new Blob([u8], { type: "image/png" });
    let urlCreator = window.URL || window.webkitURL;
    let imageUrl = urlCreator.createObjectURL(blob);

    return imageUrl;
}