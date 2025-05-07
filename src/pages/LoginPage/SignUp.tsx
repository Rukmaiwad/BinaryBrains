import { Input } from "@/components/ui/input";
import { Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import axios from "axios";
import { SIGNUP_ROUTE } from "@/utils/Urlpaths";
import { Navigate, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getIsLoggedIn, setUser } from "@/redux/slices/User";

const SignUp = () => {

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        password: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch();
    const isLoggedIn = useAppSelector(getIsLoggedIn);
    const navigate = useNavigate()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const handleSignUp = async () => {
        const { firstName, lastName, userName, email, password } = formData;
        const role = "student";

        if (!firstName || !userName || !email) {
            toast({
                title: "Missing Fields!",
                description: "Please fill all required fields.",
                color: "red"
            });
            return;
        }

        setIsLoading(true);

        try {
            const response = await axios.post(SIGNUP_ROUTE, {
                firstName,
                lastName,
                userName,
                email,
                password,
                role
            });
            if(response.status===200 || response.status === 201){
                toast({
                    title: "Success!",
                    description: "Account created successfully.",
                    color: "green"
                });

               const data = await response.data;
               const userData = data.data;
                
               dispatch(
                    setUser({
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    avatar: userData.avatar,
                    userName: userData.userName,
                    newComer: userData.newComer,
                    token: userData.token,
                    refreshToken: userData.refreshToken,
                    isLoggedIn: true
                    })
                )
                navigate('/')
            }

        } catch (error: any) {
            const message = error?.response?.data?.message || "Something went wrong.";

            toast({
                title: "SignUp Failed!",
                description: message,
                color: "red"
            });

        } finally {
            setIsLoading(false);
        }
    };

    if(isLoggedIn) {
        return <Navigate to={'/'} />
    }

    return (
        <div className="py-20 flex items-center justify-center">
            <div className="bg-black-1000 rounded-2xl shadow-lg p-10 max-w-md w-full text-center border border-gray-500">
                <h1 className="text-md font-semibold mb-1">Create your account</h1>
                <h2 style={{ fontFamily: 'fantasy' }} className="text-red-600 text-4xl font-bold font-mono mb-6">
                    Binary <span className='text-white'>Brains</span>
                </h2>

                <form className="space-y-4 text-left">
                    {[
                        { label: "First Name", name: "firstName", icon: <User />, required: true },
                        { label: "Last Name", name: "lastName", icon: <User /> },
                        { label: "Username", name: "userName", icon: <User />, required: true },
                        { label: "Email", name: "email", icon: <Mail />, required: true },
                    ].map((field) => (
                        <div key={field.name} className="relative">
                            {field.icon && (
                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                    {field.icon}
                                </div>
                            )}
                            <Input
                                type={field.name === "email" ? "email" : "text"}
                                name={field.name}
                                value={formData[field.name as keyof typeof formData]}
                                onChange={handleChange}
                                placeholder={field.label}
                                className="pl-10 pr-4 py-2 w-full text-black border rounded-lg shadow-sm"
                            />
                        </div>
                    ))}

                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                            className="pl-10 pr-10 py-2 w-full text-black border rounded-lg shadow-sm"
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>

                    <div className="flex justify-center mt-6">
                        <button
                            type="button"
                            onClick={handleSignUp}
                            disabled={isLoading}
                            className={`w-40 text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {isLoading ? 'Signing Up...' : 'Sign Up'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
