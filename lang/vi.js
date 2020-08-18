exports.restoreAccount = (linkVerify) => `
<p>Chúng tôi đã nhận được yêu cầu khôi phục lại tài khoản, có vẻ tài khoản của bạn đang gặp vấn đề hoặc bạn đã quên. Điều này thực sự đáng tiếc!</p>
<p>Nhưng đừng lo lắng, bạn có thể sử dụng liên kết dưới đây để khôi phục lại mật khẩu.</p>
<a href="${linkVerify}" target="_blank">${linkVerify}</a>
<p>Chúc bạn thành công, trân trọng.</p>
`;
