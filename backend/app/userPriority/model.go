package userpriority

type ReleaseSource struct {
	UserID         string `bson:"_id"`
	LowSourceIDs   string `bson:"lowSourceIDs"`
	MidSourceIDs   string `bson:"midSourceIDs"`
	HighSourceIDs  string `bson:"highSourceIDs"`
	LowMessageIDs  string `bson:"lowMessageIDs"`
	MidMessageIDs  string `bson:"midMessageIDs"`
	HighMessageIDs string `bson:"highMessageIDs"`
}
