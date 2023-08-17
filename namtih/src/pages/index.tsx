import { type NextPage } from "next";
import Head from "next/head";
import { useSession } from "next-auth/react";
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router'


import { api } from "../utils/api";

const Home: NextPage = () => {
  const { data: session, status } = useSession({ required: true });
  const router = useRouter()

  if (status === "loading")
    return <div>Carregando...</div>

  if (!session) {
    useEffect(() => {
      router.push('/auth/signin')
    }, [])
  }

  return (
    <>
    </>
  );
};

export default Home;
