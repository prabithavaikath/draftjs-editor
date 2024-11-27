import React, { useState, useEffect } from "react";
import {
    Editor,
    EditorState,
    RichUtils,
    Modifier,
    convertToRaw,
    convertFromRaw,
} from "draft-js";
import "draft-js/dist/Draft.css";
import "./Editor.css"; // Import the CSS file

const styleMap = {
    RED_LINE: {
        color: "red", // Change font color to red
    },
};

const DraftEditor = () => {
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );
    

    // Load saved content from localStorage
    useEffect(() => {
        const savedContent = localStorage.getItem("draftContent");
        if (savedContent) {
            const contentState = convertFromRaw(JSON.parse(savedContent)); // Parse and convert
            setEditorState(EditorState.createWithContent(contentState)); // Load content
        }
    }, []);
    

    // Save content to localStorage
    const saveContent = () => {
        const contentState = editorState.getCurrentContent();
        const rawContentState = convertToRaw(contentState);
        localStorage.setItem("draftContent", JSON.stringify(rawContentState)); // Save to localStorage
        console.log("Saved Content:", JSON.stringify(rawContentState));
        alert("Content saved to localStorage!");
    };
    

    // Handle input transformations based on patterns
    const handleBeforeInput = (input) => {
        const contentState = editorState.getCurrentContent();
        const selectionState = editorState.getSelection();
        const block = contentState.getBlockForKey(selectionState.getStartKey());
        const text = block.getText();

          // Underline Transformation
          if (text.startsWith("***") && input === " ") {
            const newContentState = Modifier.replaceText(
                contentState,
                selectionState.merge({
                    anchorOffset: 0,
                    focusOffset: text.length,
                }),
                text.slice(3) // Remove the `***`
            );
            const newEditorState = EditorState.push(
                editorState,
                newContentState,
                "change-inline-style"
            );
            setEditorState(RichUtils.toggleInlineStyle(newEditorState, "UNDERLINE"));
            return "handled";
        }
             // Red Line Transformation (RED_LINE)
             if (text.startsWith("**") && input === " ") {
                const newContentState = Modifier.replaceText(
                    contentState,
                    selectionState.merge({
                        anchorOffset: 0,
                        focusOffset: text.length,
                    }),
                    text.slice(3) // Remove the `**`
                );
                const newEditorState = EditorState.push(
                    editorState,
                    newContentState,
                    "change-inline-style"
                );
                setEditorState(RichUtils.toggleInlineStyle(newEditorState, "RED_LINE"));
                return "handled";
            }

        // Heading Transformation
        if (text.startsWith("#") && input === " ") {
            const newContentState = Modifier.replaceText(
                contentState,
                selectionState.merge({
                    anchorOffset: 0,
                    focusOffset: text.length,
                }),
                text.slice(1) // Remove the `#`
            );
            const newEditorState = EditorState.push(
                editorState,
                newContentState,
                "change-block-type"
            );
            setEditorState(RichUtils.toggleBlockType(newEditorState, "header-one"));
            return "handled";
        }

        // Bold Transformation
        if (text.startsWith("*") && input === " ") {
           // alert("Bold");
            const newContentState = Modifier.replaceText(
                contentState,
                selectionState.merge({
                    anchorOffset: 0,
                    focusOffset: text.length,
                }),
                text.slice(1) // Remove the `*`
            );
            const newEditorState = EditorState.push(
                editorState,
                newContentState,
                "change-inline-style"
            );
            setEditorState(RichUtils.toggleInlineStyle(newEditorState, "BOLD"));
            return "handled";
        }

   
        return "not-handled";
    };

    // Handle key commands for Draft.js
    const handleKeyCommand = (command, editorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            setEditorState(newState);
            return "handled";
        }
        return "not-handled";
    };

    return (
        <div className="editor-container">
            {/* Title */}
            <div>
                <h1 className="editor-title">Editor</h1>
            </div>

            {/* Save Button */}
            <div className="editor-header">
                <button className="editor-button" onClick={saveContent}>
                    Save
                </button>
            </div>

            {/* Editor */}
            <div
                className="editor-box"
                onClick={() => {
                    document.querySelector(".public-DraftEditor-content").focus();
                }}
            >
                <Editor
                    editorState={editorState}
                    onChange={setEditorState}
                    handleKeyCommand={handleKeyCommand}
                    handleBeforeInput={handleBeforeInput}
                    customStyleMap={styleMap}
                />
            </div>
        </div>
    );
};

export default DraftEditor;
