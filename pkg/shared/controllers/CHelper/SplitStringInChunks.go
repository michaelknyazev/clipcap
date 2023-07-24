package CHelper

func SplitStringInChunks(str string, chunkSize int) []string {
	if len(str) == 0 {
		return nil
	}
	if chunkSize <= 0 {
		chunkSize = 1
	}
	var chunks []string
	runeStr := []rune(str)
	for i := 0; i < len(runeStr); i += chunkSize {
		end := i + chunkSize
		if end > len(runeStr) {
			end = len(runeStr)
		}
		chunks = append(chunks, string(runeStr[i:end]))
	}
	return chunks
}
