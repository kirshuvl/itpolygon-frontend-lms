export const createFormData = (data: { [key: string]: string | number | File | undefined }): FormData => {
    const formData = new FormData()
    const cleanData = Object.fromEntries(Object.entries(data).filter(([_, value]) => value !== undefined))
    for (const [key, value] of Object.entries(cleanData)) {
        formData.append(key, value as string | Blob)
    }
    return formData
}
