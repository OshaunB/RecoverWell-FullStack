import { Button } from 'flowbite-react';

export default function Discussions() {
  return (
    <>
      <h1 className="flex justify-center font-bold text-2xl">RecoverWell Discussions</h1>
  <div className="flex justify-center my-8">
    <div>
      <Button
        gradientDuoTone="redToYellow"
        outline
      >
        <p>
          Add a new post
        </p>
      </Button>
    </div>
  </div>
    </>
  );
}
