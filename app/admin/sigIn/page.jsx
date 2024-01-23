"use client"

// import { createClient } from '@supabase/supabase-js';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'

const Admin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const supabase = createClientComponentClient();
 
    useEffect(() => {
        const getUser = async () => {
            const {data: {user} } = await supabase.auth.getUser();
            setUser(user);
            setLoading(false);
        }
        getUser();
    }, [ supabase.auth])
  

    // const supabase = createClient(
    //     process.env.NEXT_PUBLIC_SUPABASE_URL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlycWRreWdrbHVyY3R2em9teWp6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMzU5OTA1MywiZXhwIjoyMDE5MTc1MDUzfQ.RGKb_WYCyvl4aBWN8xCT8Z9PtSrn4RGSNkteHFUFxqs', {
    //     auth: {
    //       autoRefreshToken: false,
    //       persistSession: false
    //     }
    //   })
      
    //   // Access auth admin api
    //   const handleLogin = async (e) =>{
    //     e.preventDefault()
    //     const data = await supabase.auth.admin.createUser({
    //       email: 'admin@tekskillup.com',
    //       password: 'tek12345',
    //       email_confirm: true,
    //       user_metadata: {
    //         role: 'Admin'
    //       }
    //     });
    //   }

    const handleLogin = async (e) => {
      e.preventDefault();
      try {
          const res = await supabase.auth.signInWithPassword({
           email,
           password
          })

          if(res.data.user){
              setUser(res.data.user)
              setEmail('')
              setPassword('')
              setLoading(true)
              router.push('/')
          } else if(!res.data.user){
              // alert('wrong credential')
          }

          console.log(res)
          
      } catch (error) {
          console.log(error);
      }
  }


  return (
    <div>
      <div className="flex-center mt-10 md:mt-0 gap-0 md:gap-x-20">
                <div className='md:w-[40%]'>
                    <div className="md:px-8 lg:px-16">
                        <h1 className="text-gray text-2xl md:text-4xl font-semibold">Admin</h1>
                        <p className="text-lightGray text-xs md:text-sm mt-2 mb-8">Please fill your detail to access your account.</p>
                        <form onSubmit={handleLogin}>
                            <label className='text-gray text-sm md:text-base'>Email</label>
                            <div className="pb-6 md:pb-8">
                                <input 
                                    type="email"
                                    name="email"
                                    placeholder='tekstillup@example.com'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className='mt-2 w-full p-3 rounded-md border border-lightGray text-gray placeholder:text-gray-100 placeholder:text-sm focus:outline-non'
                                />
                            </div>
                            <label className='text-gray text-sm md:text-base'>Password</label>
                            <div className="pt-2 mb-4 relative">
                                <input 
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder={showPassword ? 'Password': '••••••••'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className='w-full p-3 rounded-md border border-lightGray text-gray placeholder:text-gray-100 placeholder:text-sm focus:outline-non'
                                />
                                {showPassword ? (
                                    <AiFillEyeInvisible className='absolute right-3 top-6 text-xl cursor-pointer text-lightGray ' onClick={() => setShowPassword(prevState => !prevState)} />) : (
                                    <AiFillEye className='absolute right-3 top-6 text-xl cursor-pointer text-lightGray' onClick={() => setShowPassword(prevState => !prevState)} />
                                )
                                }
                            </div>
                            <div className="flex flex-col sm:flex-row justify-between padding-y text-sm">
                                <div className="sm:flex-center">
                                    <input type="checkbox" />
                                    <label htmlfor="remember" className='ml-2'> Remember Me</label>
                                </div>
                                {/* <Link href='' className='text-primaryColor pt-2 sm:pt-0'>Forgot password</Link> */}
                            </div>
                            <button type='submit' className="w-full mt-2 mb-4 p-3 rounded-md bg-primaryColor border text-white hover:bg-white hover:text-primaryColor border-primaryColor focus:outline-none text-sm md:text-base">Sign In</button>
                           
                        </form>
                    </div>
                </div>
             </div>
    </div>
  )
}

export default Admin