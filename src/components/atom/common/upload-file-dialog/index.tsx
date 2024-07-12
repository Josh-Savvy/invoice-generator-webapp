"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { FileUploader, type UploadedFile } from "./_components/file-uploader";
import { ImageIcon } from "lucide-react";

type UploadFileDialogProps = {
	title?: string;
	onUpload?: (files: UploadedFile[]) => void;
	triggerComponent?: React.ReactNode | null;
};

const UploadFileDialog = ({ title, onUpload, triggerComponent }: UploadFileDialogProps) => {
	const [files, setFiles] = React.useState<UploadedFile[]>([]);

	const handleUpload = () => {
		if (files.length > 0) if (onUpload) onUpload(files);
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				{triggerComponent ? (
					<div className="w-full h-full flex flex-col items-center justify-center cursor-pointer select-none hover:opacity-80 relative">
						{triggerComponent}
					</div>
				) : (
					<div className="w-full h-full flex flex-col items-center justify-center rounded-xl border-_primary hover:bg-_primary/40 duration-300 bg-_primary/10 border-2 border-dotted select-none cursor-pointer">
						<ImageIcon color="#7d4bf6" size={40} />
						<p className="text-xs text-_primary tracking-tight">{title || "Upload image"}</p>
					</div>
				)}
			</DialogTrigger>
			<DialogContent className="sm:max-w-xl">
				<DialogHeader>
					<DialogTitle>Upload files</DialogTitle>
					<DialogDescription>Drag and drop your files here or click to browse.</DialogDescription>
				</DialogHeader>
				<FileUploader
					accept={{ "image/*": ["image/jpg", "image/png"] }}
					maxFiles={1}
					maxSize={2 * 1024 * 1024}
					onValueChange={setFiles}
				/>
				{files && files.length > 0 && (
					<DialogFooter className="sm:justify-start">
						<DialogClose asChild>
							<Button
								onClick={handleUpload}
								type="button"
								className="w-full bg-_primary hover:bg-_primary hover:opacity-90">
								Continue
							</Button>
						</DialogClose>
					</DialogFooter>
				)}
			</DialogContent>
		</Dialog>
	);
};

export default UploadFileDialog;
