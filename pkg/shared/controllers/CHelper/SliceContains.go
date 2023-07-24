package CHelper

func SliceContainsInt(s []int64, str int64) bool {
	for _, v := range s {
		if v == str {
			return true
		}
	}

	return false
}
