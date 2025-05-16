export const exportFile = (title: string, content: string) => {

    // Create a Blob from content with markdown MIME type
    const blob = new Blob([content], { type: 'text/markdown' })

    // Generate a temporary URL for the Blob
    const url = URL.createObjectURL(blob)

    // Create a temporary anchor element to trigger download
    const a = document.createElement('a')
    a.href = url
    a.download = `${title}.md`  // Set the downloaded file name
    a.click()   // Click to start download
    URL.revokeObjectURL(url)    // Clean up the temporary URL
}

