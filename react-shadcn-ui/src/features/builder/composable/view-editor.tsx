import { useState } from 'react';
import { Editor } from '../components/editor';
import { Viewer } from '../components/viewer';

type Props = {
  html: string;
  updateHtmlTextPart: (className: string, value: string) => void;
};

export const ViewEditor = ({ html, updateHtmlTextPart }: Props) => {
  return (
    <div className="grid w-full grid-cols-2">
      <Viewer html={html} />
      <Editor html={html} updateHtmlTextPart={updateHtmlTextPart} />
    </div>
  );
};
