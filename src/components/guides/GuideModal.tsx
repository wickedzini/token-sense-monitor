
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import ReactMarkdown from "react-markdown";
import GuideContent from "./GuideContent";

interface GuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: string;
  title: string;
  guidePath?: string;
}

const GuideModal = ({ isOpen, onClose, content, title, guidePath }: GuideModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display">{title}</DialogTitle>
          <DialogDescription>
            Follow this guide to set up your integration
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-1 h-[60vh] pr-4">
          <div className="prose max-w-none dark:prose-invert">
            {guidePath ? (
              <GuideContent guidePath={guidePath} />
            ) : (
              <ReactMarkdown>{content}</ReactMarkdown>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default GuideModal;
