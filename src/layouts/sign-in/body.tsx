import loginBg from "@/assets/login-bg.jpg";
import logo from "@/assets/logo.png";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

/**********************************
 * Interfaces and Types
 **********************************/
interface BodyProps {
  isLoading?: boolean;
  loginSubmit: (data: any) => void;
}

const Body: React.FC<BodyProps> = ({ isLoading, loginSubmit }) => {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginFormValues) => {
    loginSubmit(data);
  };
  return (
    <div
      className="h-screen w-screen bg-cover flex items-center justify-center"
      style={{ backgroundImage: `url(${loginBg})` }}
    >
      <div className="bg-black/40 w-full h-full flex items-center justify-center">
        <div className="w-[438px] rounded-[30px] bg-white p-7 flex flex-col gap-y-5 items-center ">
          <div className="h-14 w-32 mx-auto">
            <img src={logo} alt="Logo" className="h-full w-full" />
          </div>
          <div className="w-full flex flex-col gap-y-5">
            <div className="flex flex-col gap-y-1 items-center justify-center">
              <h5 className="font-inter font-semibold text-[18px] leading-[100%] tracking-[-0.11px] text-[#121212]">
                Login to Account
              </h5>
              <p className="font-inter font-normal text-[13px] leading-[100%] tracking-[-0.06px] text-center text-[#323232]">
                Please enter your email and password to continue
              </p>
            </div>
            <div className="w-full">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4 w-full"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-inter">
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Enter your email"
                            className="font-inter text-sm"
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
                        <FormLabel className="text-sm font-inter">
                          Password
                        </FormLabel>
                        <FormControl>
                          <Input
                            isPassword
                            placeholder="Enter your password"
                            className="font-inter text-sm"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full mt-2 font-inter font-medium text-[15px] h-12"
                  >
                    {isLoading ? "..." : "Login"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
