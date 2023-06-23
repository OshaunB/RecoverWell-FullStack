// // import {
// //   Card,
// //   CardHeader,
// //   CardBody,
// //   Typography,
// //   Avatar,
// // } from "@material-tailwind/react";
// // import { StarIcon } from "@heroicons/react/24/solid";

// // export default function Example(props) {
// //   return (
// //     <div className="flex justify-center items-center">
// //       <Card color="transparent" shadow={true} className="w-full max-w-[50rem]">
// //         <CardHeader
// //           color="transparent"
// //           floated={false}
// //           shadow={false}
// //           className="mx-0 flex items-center gap-4 pt-0 pb-8"
// //         >
// //           <Avatar
// //             size="lg"
// //             variant="circular"
// //             src={props.avatar}
// //           />
// //           <div className="flex w-full flex-col gap-0.5">
// //             <div className="flex items-center justify-between">
// //               <Typography variant="h5" color="blue-gray">
// //                 Candice Wu
// //               </Typography>
// //             </div>
// //             <Typography color="blue-gray">Frontend Lead @ Google</Typography>
// //           </div>
// //         </CardHeader>
// //         <CardBody className="mb-6 p-0">
// //           <Typography>
// //           {props.description}
// //           </Typography>
// //         </CardBody>
// //       </Card>
// //     </div>
// //   );
// // }

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
  CardFooter,
  Typography,
  Avatar,
  Tooltip,
} from "@material-tailwind/react";

export default function Example() {
  return (
    <Card className="max-w-[24rem] overflow-hidden">
      <CardFooter className="flex items-center justify-between">
        <div className="flex items-center -space-x-3">
          <Tooltip content="Natali Craig">
            <Avatar
              size="sm"
              variant="circular"
              alt="natali craig"
              src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1061&q=80"
              className="border-2 border-white hover:z-10"
            />
          </Tooltip>
          <Tooltip content="Candice Wu">
            <Avatar
              size="sm"
              variant="circular"
              alt="candice wu"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
              className="border-2 border-white hover:z-10"
            />
          </Tooltip>
        </div>
        <Typography className="font-normal">January 10</Typography>
      </CardFooter>
    </Card>
  );
}
