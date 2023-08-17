import { type NextPage } from "next";
import { signIn } from "next-auth/react";
import React, { useState, useRef, useEffect } from 'react';

const SignIn: NextPage = () => {
  return (
    <>
      <main className="flex min-h-screen">
        <div className="flex flex-row w-full">

          <div className='hidden lg:flex flex-col justify-between bg-[#ff5232] lg:p-8 xl:p-12 lg:max-w-sm xl:max-w-lg'>
            <div className="flex items-center justify-start space-x-3">
              <a href="#" className="font-medium text-xl">SEMEAR GRILL HALL</a>
            </div>
            <div className='space-y-5'>
              <h1 className="lg:text-3xl xl:text-5xl xl:leading-snug font-extrabold">Não perca tempo, realize já o seu pedido!</h1>
              <p className="text-lg">Não possue um cadastro? Clique no botão abaixo</p>
              <button
                className="inline-block flex-none px-4 py-3 border-2 rounded-lg font-medium border-black bg-black text-white">Criar nova conta</button>
            </div>
          </div>

          <div className="flex flex-1 flex-col items-center justify-center px-10 relative">
            <div className="grid lg:hidden justify-between items-center w-full py-4">
              <div className="flex items-center justify-start space-x-3">
                <a href="#" className="font-medium text-lg">SEMEAR GRILL HALL</a>
              </div>
              <div className="flex items-center space-x-2">
                <span>Não possue um cadastro? </span>
                <a href="#" className="underline font-medium text-[#070eff]">
                  Clique e crie sua conta
                </a>
              </div>
            </div>

            <div className="flex flex-1 flex-col  justify-center space-y-5 max-w-md">
              <div className="flex flex-col space-y-2 text-center">
                <h2 className="text-3xl md:text-4xl font-bold">Acessar conta</h2>
                <p className="text-md md:text-xl">Realize seu acesso com e-mail e senha</p>
              </div>
              <div className="flex flex-col max-w-md space-y-5">
                <SignEmail />
                <div className="flex justify-center items-center">
                  <span className="w-full border border-black"></span>
                  <span className="px-4">Ou</span>
                  <span className="w-full border border-black"></span>
                </div>
                <SignWithGoogle />
              </div>
            </div>

          </div>
        </div>
      </main>
    </>
  );
};

export default SignIn;

const SignEmail: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSubmit = async (): Promise<void> => {
    let { email } = formData;
    const res = await signIn('email', { email })
    if(res?.error) alert('E-mail ou senha inválidos')
  }

  interface IFormData {
    email: string
  }

  const [formData, setFormData] = useState<IFormData>({ email: '' });
  const handleChange = (input: string, e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({ ...formData, [input]: e.target.value });
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <>
      <input type="text" placeholder="E-mail" ref={inputRef} onKeyDown={ (e) => { if(e.key === 'Enter') handleSubmit() } } onChange={ (e) => handleChange('email', e) }
        className="flex px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal" />
      <button type='button' onClick={ handleSubmit } className="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium border-black bg-black text-white">
        Acessar com e-mail
      </button>
    </>
  )
}

const SignWithGoogle: React.FC = () => {
  return (
    <button
      className="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium border-black"
      onClick={
        () => void signIn('google')
      }
    >
      Acessar com o Google
    </button>
  );
};

const SignWithFacebook: React.FC = () => {
  return (
    <button
      className="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium border-black"
      onClick={
        () => void signIn('facebook')
      }
    >
      Acessar com o Facebook
    </button>
  );
};
