import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "cn";

const ResumeAnalysis = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold">Phân tích CV bằng AI</h1>
      <p>Đối chiếu CV với mô tả công việc, nhận điểm ATS và gợi ý chỉnh sửa</p>
      <form action="" className="border rounded-lg p-4">
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Thông tin phân tích</FieldLegend>
            <FieldGroup>
              <div className="grid grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="checkout-7j9-card-name-43j">
                    Công ty (Không bắt buộc)
                  </FieldLabel>
                  <Input
                    id="checkout-7j9-card-name-43j"
                    placeholder="Công ty ABC..."
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="checkout-7j9-card-number-uw1">
                    Vị trí ứng tuyển (*)
                  </FieldLabel>
                  <Input
                    id="checkout-7j9-card-number-uw1"
                    placeholder="Full-stack Developer"
                    required
                  />
                </Field>
              </div>

              <Field>
                <FieldLabel htmlFor="checkout-7j9-optional-comments">
                  Mô tả công việc
                </FieldLabel>
                <Textarea
                  id="checkout-7j9-optional-comments"
                  placeholder="Nội dung JD chi tiết của nhà tuyển dụng..."
                  className="resize-none"
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="checkout-7j9-exp-year-f59">
                  Chọn vị trí đang tuyển trên HireDemo
                </FieldLabel>
                <Select items={years}>
                  <SelectTrigger id="checkout-7j9-exp-year-f59">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {years.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
              <Field orientation="horizontal">
                <Checkbox
                  id="checkout-7j9-same-as-shipping-wgm"
                  defaultChecked
                />
                <FieldLabel
                  htmlFor="checkout-7j9-same-as-shipping-wgm"
                  className="font-normal"
                >
                  Tôi đồng ý gửi CV và JD tới dịch vụ AI để phân tích. HireFlow
                  chỉ dùng để phân tích; bạn có thể xóa kết quả bất cứ lúc nào.
                </FieldLabel>
              </Field>
              <Field>
                <FieldLabel htmlFor="checkout-7j9-card-number-uw1">
                  CV (PDF)
                </FieldLabel>
                <Input
                  id="checkout-7j9-card-number-uw1"
                  type="file"
                  required
                  className={cn("min-h-20")}
                />
              </Field>
              <Field orientation="horizontal">
                <Button
                  type="submit"
                  variant="outline"
                  className={cn("w-full max-w-96 m-auto")}
                >
                  Phân tích CV
                </Button>
              </Field>
            </FieldGroup>
          </FieldSet>
        </FieldGroup>
      </form>
    </div>
  );
};

export default ResumeAnalysis;
