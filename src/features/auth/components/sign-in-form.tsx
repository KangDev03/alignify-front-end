import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { type SignInFormValues, signInSchema } from "@/features/auth/auth.schema"
import { useAppDispatch } from "@/hooks/redux";
import { zodResolver } from "@hookform/resolvers/zod"

import { useLoginMutation } from "../auth.service";
import { setCredentials } from "../auth.slice";

export default function SignInForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  async function onSubmit(values: SignInFormValues) {
    try {
      const response = await login(values).unwrap();
      dispatch(setCredentials(response.data));
      navigate("/dashboard");
    } catch (err) {
      console.error('Failed to login:', err);
      console.log(values);
    }
  }

  const form = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  return (
    <Card className="w-full max-w-md border-2 bg-card shadow-lg">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold text-primary">Đăng nhập</CardTitle>
        <CardDescription>Nhập thông tin đăng nhập của bạn để tiếp tục</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="example@example.com"
                      className="border-input focus:border-primary"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Mật khẩu</FormLabel>
                    <Link to="/forgot-password" className="text-sm text-primary hover:text-primary/80">
                      Quên mật khẩu?
                    </Link>
                  </div>
                  <FormControl>
                    <Input type="password" className="border-input focus:border-primary" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90"
              disabled={isLoading}
            >
              {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
            </Button>
          </form>
        </Form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">hoặc</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <Button variant="outline" className="w-full">
          Đăng nhập với Google
        </Button>
        <div className="text-center text-sm text-muted-foreground">
          Chưa có tài khoản?{" "}
          <Link to="/auth/select-role" className="font-medium text-primary hover:text-primary/80">
            Đăng ký
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}
