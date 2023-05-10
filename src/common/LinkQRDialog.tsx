import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Paper, { PaperProps } from "@mui/material/Paper";
import Draggable from "react-draggable";
import QRCode from "react-qr-code";
import { ISurvey } from "../pages/Survey";
import { Typography } from "@material-ui/core";

function PaperComponent(props: PaperProps) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

interface IDetails extends ISurvey {
  qrValue: string;
}

interface LinkQRDialogProps {
  details: IDetails;
}

const dataURLtoBlob = (dataURL: string) => {
  const arr = dataURL.split(",");
  const mime = arr[0].match(/:(.*?);/)![1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
};

export default function DraggableDialog({ details }: LinkQRDialogProps) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const qrRef = React.useRef<any>(null);
  const [canvasLoaded, setCanvasLoaded] = React.useState(false);

  React.useEffect(() => {
    if (qrRef.current) {
      setCanvasLoaded(true);
    }
  }, [qrRef.current]);

  const downloadQR = () => {
    if (typeof window === undefined) {
      return;
    }

    const svgElement = qrRef.current;
    if (!svgElement) {
      return;
    }
    const svgData = new XMLSerializer().serializeToString(svgElement);
    // create an image element
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = svgElement.clientWidth;
      canvas.height = svgElement.clientHeight;

      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
          if (blob) {
            const link = document.createElement("a");
            link.download = `qr-${details.path}.png`;
            link.href = URL.createObjectURL(blob);
            link.click();
          }
        });
      }
    };
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };

  return (
    <div>
      <Button variant="text" onClick={handleClickOpen}>
        Show QR code
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          QR Code
        </DialogTitle>
        <DialogContent>
          <Typography
            component={"h2"}
            variant="h1"
            style={{
              fontSize: "1.5rem",
              margin: "1rem 0",
            }}
          >
            {details?.name}
          </Typography>
          <QRCode
            ref={qrRef}
            size={256}
            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
            value={details.qrValue}
            viewBox={`0 0 256 256`}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
          <Button variant="contained" onClick={downloadQR}>
            Download
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
