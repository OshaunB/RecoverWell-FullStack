// import {
//   Dialog,
//   DialogBody,
// } from "@material-tailwind/react";
// import { useState } from "react";

// export default function Example(props) {
//   const [open, setOpen] = useState(false);
//   const handleOpen = () => setOpen((cur) => !cur);

//   return (
//     <>
//       <div
//         className="h-64 w-64 cursor-pointer transition-opacity hover:opacity-90"
//         onClick={handleOpen}
//       >
//         <img
//           alt="nature"
//           className="h-full w-full rounded-full"
//           src={props.image}
//         />
//       </div>
//       <Dialog size="xl" open={open} handler={handleOpen}>
//         <DialogBody divider={true} className="p-0">
//           <img
//             alt="nature"
//             className="h-[48rem] w-full object-cover object-center"
//             src={props.image}
//           />
//         </DialogBody>
//       </Dialog>
//     </>
//   );
// }

import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import { StarIcon } from "@heroicons/react/24/solid";
 
export default function Example() {
  return (
    <div className="flex justify-center align-items">
    <Card color="transparent" shadow={false} className="w-full max-w-[26rem]">
      <CardHeader
        color="transparent"
        floated={false}
        shadow={false}
        className="mx-0 flex items-center gap-4 pt-0 pb-8"
      >
        <Avatar
          size="lg"
          variant="circular"
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          alt="candice wu"
        />
        <div className="flex w-full flex-col gap-0.5">
          <div className="flex items-center justify-between">
            <Typography variant="h5" color="blue-gray">
              Candice Wu
            </Typography>
          </div>
          <Typography color="blue-gray">Frontend Lead @ Google</Typography>
        </div>
      </CardHeader>
      <CardBody className="mb-6 p-0">
        <Typography>
          &quot;I found solution to all my design needs from Creative Tim. I use
          them as a freelancer in my hobby projects for fun! And its really
          affordable, very humble guys !!!&quot;
        </Typography>
      </CardBody>
    </Card>
    </div>
  );
}