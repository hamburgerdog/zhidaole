package errno

var (
	// OK
	OK = NewError(0, "OK")

	// 服务级错误码
	ErrServer    = NewError(10001, "服务异常，请联系管理员")
	ErrParam     = NewError(10002, "参数有误")
	ErrSignParam = NewError(10003, "签名参数有误")

	//  release
	ReleaseError = NewError(20001, "新建发布源失败")
)
