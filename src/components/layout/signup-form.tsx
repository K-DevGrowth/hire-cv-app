import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Tạo tài khoản</CardTitle>
        <CardDescription>
          Nhập thông tin bên dưới để tạo tài khoản của bạn
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Họ và tên</FieldLabel>
              <Input id="name" type="text" placeholder="Nguyễn Văn A" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
              <FieldDescription>
                Chúng tôi sẽ dùng email này để liên hệ với bạn và cam kết không chia sẻ cho bất kỳ ai.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Mật khẩu</FieldLabel>
              <Input id="password" type="password" required />
              <FieldDescription>
                Mật khẩu phải có ít nhất 8 ký tự.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Xác nhận mật khẩu
              </FieldLabel>
              <Input id="confirm-password" type="password" required />
              <FieldDescription>Vui lòng xác nhận lại mật khẩu.</FieldDescription>
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit">Đăng ký</Button>
                <Button variant="outline" type="button">
                  Đăng ký với Google
                </Button>
                <FieldDescription className="px-6 text-center">
                  Đã có tài khoản?{" "}
                  <Link href="/login">Đăng nhập</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
