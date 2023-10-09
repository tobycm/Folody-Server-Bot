import { UserError } from "./base";

export class NoPermissions extends UserError {
  constructor() {
    super("Bạn không có quyền dùng lệnh này!");
  }
}

export class BotHasNoPermissions extends UserError {
  constructor() {
    super("Tôi không có quyền sử dụng lệnh lên người dùng!");
  }
}

export class TargetIsSelf extends UserError {
  constructor() {
    super("Tôi không thể sử dụng lệnh lên bản thân!");
  }
}

export class TargetIsAuthor extends UserError {
  constructor() {
    super("Bạn không thể sử dụng lệnh lên bản thân!");
  }
}

export class TargetNotFound extends UserError {
  constructor() {
    super("Không tìm thấy mục tiêu");
  }
}

export class AuthorRoleIsLower extends UserError {
  constructor() {
    super("Bạn không thể sử dụng lệnh lên người này vì họ có quyền cao hơn hoặc bằng bạn!");
  }
}

export class BotRoleIsLower extends UserError {
  constructor() {
    super("Tôi không thể sử dụng lệnh lên người này vì họ có quyền cao hơn hoặc bằng tôi!");
  }
}
