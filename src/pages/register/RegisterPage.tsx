/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useAppDispatch } from "@/redux/hook";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";
import { verifyToken } from "@/utils/verifyToken";
import { setUser, TUser } from "@/redux/features/auth/authSlice";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [register] = useRegisterMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    const toastId = toast.loading("Registration...");
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await register({ name, email, password }).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;

      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success("Registration is successful", {
        id: toastId,
        duration: 3000,
      });

      navigate("/messages");
    } catch (err: any) {
      console.log(err);
      toast.error("Something went wrong", { id: toastId, duration: 3000 });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-md space-y-8 p-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Create an account
          </h1>
          <p className="text-gray-400">Sign up to start messaging</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <Alert
              variant="destructive"
              className="bg-red-900/50 border-red-900 text-red-300"
            >
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-300">
              Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-gray-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-300">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-gray-500"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-300">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus-visible:ring-gray-500"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-white text-black hover:bg-gray-200"
            disabled={isLoading}
          >
            {isLoading ? "Signing up..." : "Sign up"}
          </Button>

          <div className="text-center text-sm">
            <span className="text-gray-400">Already have an account? </span>
            <Link to="/login">
              <Button variant="link" className="text-white hover:text-gray-300">
                Log In
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
