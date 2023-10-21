import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";

const Home: NextPage = () => {
  const { data: session } = useSession();
  console.log("Session:", session);

  if (!session) {
    return (
      <div className="mx-auto max-w-xl">
        <h1 className="mb-4 text-2xl font-bold">
          You must be logged in to access this health racker.
        </h1>
        <button
          onClick={() => void signIn("discord")}
          className="rounded-md bg-blue-600 px-4 py-2 text-white"
        >
          Sign in with Discord
        </button>
      </div>
    );
  }
  return (
    <>
      <Head>
        <title>Health Tracker</title>
        <meta name="description" content="Track your health metrics" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Health <span className="text-[hsl(280,100%,70%)]">Tracker</span>
          </h1>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <Link
              href="/calorie-intake"
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            >
              <h3 className="text-2xl font-bold">Calorie Intake →</h3>
              <div className="text-lg">
                Track your daily calorie intake, view previous records.
              </div>
            </Link>

            <Link
              href="/water-intake"
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            >
              <h3 className="text-2xl font-bold">Water Intake →</h3>
              <div className="text-lg">
                Keep tabs on your water consumption.
              </div>
            </Link>

            <Link
              href="/sleep"
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            >
              <h3 className="text-2xl font-bold">Sleep Tracker →</h3>
              <div className="text-lg">Monitor your sleep patterns.</div>
            </Link>
            <Link
              href="/weight"
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
            >
              <h3 className="text-2xl font-bold">Weight Tracker →</h3>
              <div className="text-lg">Track your weight in real time</div>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
