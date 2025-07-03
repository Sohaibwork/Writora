"use client";

import { useState, useRef, useEffect } from "react";

interface Tag {
  id: string;
  name: string;
}

interface BlogPost {
  title: string;
  content: string;
  tags: Tag[];
  wordCount: number;
  charCount: number;
  createdAt: string;
  lastModified: string;
}

export default function BlogEditor() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<Tag[]>([]);
  const [newTag, setNewTag] = useState("");
  const [isPreview, setIsPreview] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [showSidebar, setShowSidebar] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showMobileToolbar, setShowMobileToolbar] = useState(false);
  const [activeSection, setActiveSection] = useState("stats");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const words = content
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
    const chars = content.length;
    setWordCount(words);
    setCharCount(chars);
  }, [content]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Initialize with sample content
  useEffect(() => {
    setTitle("My Amazing Blog Post");
    setContent(`# Welcome to My Blog

This is a **sample blog post** to demonstrate the *beautiful* editor interface.

## Features

- Rich text formatting
- Live preview
- Word count tracking
- Tag management
- Responsive design

> This is a blockquote to show how quotes look in the editor.

### Getting Started

1. Start typing your content
2. Use the toolbar for formatting
3. Add tags to categorize your post
4. Preview your work
5. Save when ready!

Feel free to edit this content and explore all the features of this modern blog editor.`);

    setTags([
      { id: "1", name: "blogging" },
      { id: "2", name: "writing" },
      { id: "3", name: "tutorial" },
    ]);
  }, []);

  const insertText = (before: string, after: string = "") => {
    if (textareaRef.current) {
      const start = textareaRef.current.selectionStart;
      const end = textareaRef.current.selectionEnd;
      const selectedText = content.substring(start, end);
      const newText =
        content.substring(0, start) +
        before +
        selectedText +
        after +
        content.substring(end);
      setContent(newText);

      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
          textareaRef.current.setSelectionRange(
            start + before.length,
            end + before.length
          );
        }
      }, 0);
    }
  };

  const addTag = () => {
    if (newTag.trim() && !tags.some((tag) => tag.name === newTag.trim())) {
      const newTagObj: Tag = {
        id: Date.now().toString(),
        name: newTag.trim(),
      };
      setTags([...tags, newTagObj]);
      setNewTag("");
    }
  };

  const removeTag = (tagId: string) => {
    setTags(tags.filter((tag) => tag.id !== tagId));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && newTag.trim()) {
      addTag();
    }
  };

  const formatText = (format: string) => {
    switch (format) {
      case "bold":
        insertText("**", "**");
        break;
      case "italic":
        insertText("*", "*");
        break;
      case "underline":
        insertText("<u>", "</u>");
        break;
      case "quote":
        insertText("> ");
        break;
      case "list":
        insertText("- ");
        break;
      case "orderedList":
        insertText("1. ");
        break;
      case "link":
        insertText("[", "](url)");
        break;
      case "image":
        insertText("![alt text](", ")");
        break;
      case "h1":
        insertText("# ");
        break;
      case "h2":
        insertText("## ");
        break;
      case "h3":
        insertText("### ");
        break;
      default:
        break;
    }
  };

  const savePost = () => {
    const post: BlogPost = {
      title,
      content,
      tags,
      wordCount,
      charCount,
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString(),
    };

    const savedPosts = JSON.parse(localStorage.getItem("blogPosts") || "[]");
    savedPosts.push(post);
    localStorage.setItem("blogPosts", JSON.stringify(savedPosts));

    alert("Post saved successfully!");
  };

  const exportPost = () => {
    const post = { title, content, tags, wordCount, charCount };
    const dataStr = JSON.stringify(post, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);

    const exportFileDefaultName = `${title || "blog-post"}.json`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    if (!isFullscreen) {
      setShowSidebar(false);
    }
  };

  const formatMarkdown = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>")
      .replace(
        /^# (.*$)/gm,
        '<h1 class="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">$1</h1>'
      )
      .replace(
        /^## (.*$)/gm,
        '<h2 class="text-2xl font-semibold text-slate-800 dark:text-slate-200 mb-3">$1</h2>'
      )
      .replace(
        /^### (.*$)/gm,
        '<h3 class="text-xl font-medium text-slate-700 dark:text-slate-300 mb-2">$1</h3>'
      )
      .replace(
        /^> (.*$)/gm,
        '<blockquote class="border-l-4 border-blue-500 pl-4 italic text-slate-600 dark:text-slate-400 my-4">$1</blockquote>'
      )
      .replace(/^- (.*$)/gm, '<li class="mb-1">$1</li>')
      .replace(/^\d+\. (.*$)/gm, '<li class="mb-1">$1</li>')
      .replace(/\n/g, "<br>");
  };

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        isFullscreen ? "fixed inset-0 z-50" : ""
      } bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800`}
    >
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-slate-900/80 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                {/* File Icon */}
                <svg
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  ></path>
                </svg>
                <h1 className="text-xl font-bold text-slate-800 dark:text-slate-200 hidden sm:block">
                  BlogEditor
                </h1>
                <h1 className="text-lg font-bold text-slate-800 dark:text-slate-200 sm:hidden">
                  BE
                </h1>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setShowMobileToolbar(!showMobileToolbar)}
                className="md:hidden p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {/* Menu Icon */}
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </button>

              {/* Desktop Actions */}
              <div className="hidden md:flex items-center space-x-2">
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  {isDarkMode ? (
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                      ></path>
                    </svg>
                  ) : (
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                      ></path>
                    </svg>
                  )}
                </button>

                <button
                  onClick={toggleFullscreen}
                  className="px-3 py-1.5 text-sm border rounded-md hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  {isFullscreen ? (
                    <svg
                      className="h-4 w-4 mr-2 inline"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 9V4.5M9 9H4.5M9 9L3.5 3.5M15 9h4.5M15 9V4.5M15 9l5.5-5.5M9 15H4.5M9 15v4.5M9 15l-5.5 5.5M15 15h4.5M15 15v4.5m0-4.5l5.5 5.5"
                      ></path>
                    </svg>
                  ) : (
                    <svg
                      className="h-4 w-4 mr-2 inline"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                      ></path>
                    </svg>
                  )}
                  Fullscreen
                </button>

                <button
                  onClick={() => setIsPreview(!isPreview)}
                  className="px-3 py-1.5 text-sm border rounded-md hover:bg-slate-50 dark:hover:bg-slate-800"
                >
                  <svg
                    className="h-4 w-4 mr-2 inline"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    ></path>
                  </svg>
                  {isPreview ? "Edit" : "Preview"}
                </button>

                <button
                  onClick={() => setShowSidebar(!showSidebar)}
                  className="px-3 py-1.5 text-sm border rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 lg:hidden"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                </button>

                <button
                  onClick={savePost}
                  className="px-4 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  <svg
                    className="h-4 w-4 mr-2 inline"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                    ></path>
                  </svg>
                  Save
                </button>
              </div>

              {/* Mobile Actions */}
              <div className="md:hidden flex items-center space-x-1">
                <button
                  onClick={() => setIsPreview(!isPreview)}
                  className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    ></path>
                  </svg>
                </button>

                <button
                  onClick={savePost}
                  className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Toolbar */}
          {showMobileToolbar && (
            <div className="md:hidden mt-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <div className="flex flex-wrap gap-2 mb-3">
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="p-2 rounded-md hover:bg-slate-200 dark:hover:bg-slate-600"
                >
                  {isDarkMode ? (
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                      ></path>
                    </svg>
                  ) : (
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                      ></path>
                    </svg>
                  )}
                </button>

                <button
                  onClick={toggleFullscreen}
                  className="px-3 py-1.5 text-sm border rounded-md hover:bg-slate-200 dark:hover:bg-slate-600"
                >
                  {isFullscreen ? (
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 9V4.5M9 9H4.5M9 9L3.5 3.5M15 9h4.5M15 9V4.5M15 9l5.5-5.5M9 15H4.5M9 15v4.5M9 15l-5.5 5.5M15 15h4.5M15 15v4.5m0-4.5l5.5 5.5"
                      ></path>
                    </svg>
                  ) : (
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                      ></path>
                    </svg>
                  )}
                </button>

                <button
                  onClick={() => setShowSidebar(!showSidebar)}
                  className="px-3 py-1.5 text-sm border rounded-md hover:bg-slate-200 dark:hover:bg-slate-600"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                </button>

                <button
                  onClick={exportPost}
                  className="px-3 py-1.5 text-sm border rounded-md hover:bg-slate-200 dark:hover:bg-slate-600"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    ></path>
                  </svg>
                </button>
              </div>

              {/* Mobile Formatting Toolbar */}
              <div className="flex flex-wrap gap-1">
                <button
                  onClick={() => formatText("bold")}
                  className="h-8 w-8 p-0 rounded-md hover:bg-slate-200 dark:hover:bg-slate-600 toolbar-button"
                >
                  <svg
                    className="h-4 w-4 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z"
                    ></path>
                  </svg>
                </button>
                <button
                  onClick={() => formatText("italic")}
                  className="h-8 w-8 p-0 rounded-md hover:bg-slate-200 dark:hover:bg-slate-600 toolbar-button"
                >
                  <svg
                    className="h-4 w-4 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 4l4 16"
                    ></path>
                  </svg>
                </button>
                <button
                  onClick={() => formatText("h1")}
                  className="h-8 px-2 text-xs font-bold rounded-md hover:bg-slate-200 dark:hover:bg-slate-600 toolbar-button"
                >
                  H1
                </button>
                <button
                  onClick={() => formatText("h2")}
                  className="h-8 px-2 text-xs font-bold rounded-md hover:bg-slate-200 dark:hover:bg-slate-600 toolbar-button"
                >
                  H2
                </button>
                <button
                  onClick={() => formatText("list")}
                  className="h-8 w-8 p-0 rounded-md hover:bg-slate-200 dark:hover:bg-slate-600 toolbar-button"
                >
                  <svg
                    className="h-4 w-4 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 10h16M4 14h16M4 18h16"
                    ></path>
                  </svg>
                </button>
                <button
                  onClick={() => formatText("quote")}
                  className="h-8 w-8 p-0 rounded-md hover:bg-slate-200 dark:hover:bg-slate-600 toolbar-button"
                >
                  <svg
                    className="h-4 w-4 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    ></path>
                  </svg>
                </button>
                <button
                  onClick={() => formatText("link")}
                  className="h-8 w-8 p-0 rounded-md hover:bg-slate-200 dark:hover:bg-slate-600 toolbar-button"
                >
                  <svg
                    className="h-4 w-4 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div
          className={`grid gap-6 transition-all duration-300 ${
            isFullscreen || !showSidebar
              ? "grid-cols-1"
              : "grid-cols-1 lg:grid-cols-4"
          }`}
        >
          {/* Main Editor */}
          <div
            className={`${
              isFullscreen || !showSidebar ? "col-span-1" : "lg:col-span-3"
            }`}
          >
            <div className="shadow-lg border-0 bg-white/70 backdrop-blur-sm dark:bg-slate-800/70 rounded-xl border py-6">
              <div className="px-6 pb-4">
                <div className="space-y-4">
                  {/* Title Input */}
                  <input
                    type="text"
                    placeholder="Enter your blog title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full text-xl md:text-2xl font-bold border-0 bg-transparent placeholder:text-slate-400 focus:outline-none focus:ring-0 px-0"
                  />

                  {/* Desktop Toolbar */}
                  <div className="hidden md:flex flex-wrap items-center gap-1 p-2 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => formatText("bold")}
                        className="h-8 w-8 p-0 rounded-md hover:bg-slate-200 dark:hover:bg-slate-600 toolbar-button"
                      >
                        <svg
                          className="h-4 w-4 mx-auto"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 4h8a4 4 0 014 4 4 4 0 01-4 4H6z"
                          ></path>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 12h9a4 4 0 014 4 4 4 0 01-4 4H6z"
                          ></path>
                        </svg>
                      </button>
                      <button
                        onClick={() => formatText("italic")}
                        className="h-8 w-8 p-0 rounded-md hover:bg-slate-200 dark:hover:bg-slate-600 toolbar-button"
                      >
                        <svg
                          className="h-4 w-4 mx-auto"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 4l4 16"
                          ></path>
                        </svg>
                      </button>
                      <button
                        onClick={() => formatText("underline")}
                        className="h-8 w-8 p-0 rounded-md hover:bg-slate-200 dark:hover:bg-slate-600 toolbar-button"
                      >
                        <svg
                          className="h-4 w-4 mx-auto"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 002-2v-3a2 2 0 012-2h8a2 2 0 012 2v3a2 2 0 002 2"
                          ></path>
                        </svg>
                      </button>
                    </div>

                    <div className="w-px h-6 bg-slate-300 dark:bg-slate-600"></div>

                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => formatText("h1")}
                        className="h-8 px-2 text-xs font-bold rounded-md hover:bg-slate-200 dark:hover:bg-slate-600 toolbar-button"
                      >
                        H1
                      </button>
                      <button
                        onClick={() => formatText("h2")}
                        className="h-8 px-2 text-xs font-bold rounded-md hover:bg-slate-200 dark:hover:bg-slate-600 toolbar-button"
                      >
                        H2
                      </button>
                      <button
                        onClick={() => formatText("h3")}
                        className="h-8 px-2 text-xs font-bold rounded-md hover:bg-slate-200 dark:hover:bg-slate-600 toolbar-button"
                      >
                        H3
                      </button>
                    </div>

                    <div className="w-px h-6 bg-slate-300 dark:bg-slate-600"></div>

                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => formatText("list")}
                        className="h-8 w-8 p-0 rounded-md hover:bg-slate-200 dark:hover:bg-slate-600 toolbar-button"
                      >
                        <svg
                          className="h-4 w-4 mx-auto"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 10h16M4 14h16M4 18h16"
                          ></path>
                        </svg>
                      </button>
                      <button
                        onClick={() => formatText("orderedList")}
                        className="h-8 w-8 p-0 rounded-md hover:bg-slate-200 dark:hover:bg-slate-600 toolbar-button"
                      >
                        <svg
                          className="h-4 w-4 mx-auto"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h2m9-9h2a2 2 0 012 2v6a2 2 0 01-2 2h-2m-9-9l9 9m0-9l-9 9"
                          ></path>
                        </svg>
                      </button>
                      <button
                        onClick={() => formatText("quote")}
                        className="h-8 w-8 p-0 rounded-md hover:bg-slate-200 dark:hover:bg-slate-600 toolbar-button"
                      >
                        <svg
                          className="h-4 w-4 mx-auto"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                          ></path>
                        </svg>
                      </button>
                    </div>

                    <div className="w-px h-6 bg-slate-300 dark:bg-slate-600"></div>

                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => formatText("link")}
                        className="h-8 w-8 p-0 rounded-md hover:bg-slate-200 dark:hover:bg-slate-600 toolbar-button"
                      >
                        <svg
                          className="h-4 w-4 mx-auto"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                          ></path>
                        </svg>
                      </button>
                      <button
                        onClick={() => formatText("image")}
                        className="h-8 w-8 p-0 rounded-md hover:bg-slate-200 dark:hover:bg-slate-600 toolbar-button"
                      >
                        <svg
                          className="h-4 w-4 mx-auto"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-6 pt-0">
                {!isPreview ? (
                  <textarea
                    ref={textareaRef}
                    placeholder="Start writing your blog post..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className={`w-full border-0 bg-transparent resize-none focus:outline-none focus:ring-0 text-base leading-relaxed ${
                      isFullscreen
                        ? "min-h-[calc(100vh-300px)]"
                        : "min-h-[400px] md:min-h-[500px]"
                    }`}
                  />
                ) : (
                  <div
                    className={`prose prose-slate max-w-none dark:prose-invert ${
                      isFullscreen
                        ? "min-h-[calc(100vh-300px)]"
                        : "min-h-[400px] md:min-h-[500px]"
                    }`}
                    dangerouslySetInnerHTML={{
                      __html: formatMarkdown(content),
                    }}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          {showSidebar && !isFullscreen && (
            <div className="lg:col-span-1">
              <div className="space-y-6">
                {/* Mobile Section Tabs */}
                <div className="lg:hidden">
                  <div className="flex space-x-1 bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
                    <button
                      onClick={() => setActiveSection("stats")}
                      className={`flex-1 px-3 py-2 text-sm rounded-md ${
                        activeSection === "stats"
                          ? "bg-blue-600 text-white"
                          : "hover:bg-slate-200 dark:hover:bg-slate-700"
                      }`}
                    >
                      <svg
                        className="h-4 w-4 mr-1 inline"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                      Stats
                    </button>
                    <button
                      onClick={() => setActiveSection("tags")}
                      className={`flex-1 px-3 py-2 text-sm rounded-md ${
                        activeSection === "tags"
                          ? "bg-blue-600 text-white"
                          : "hover:bg-slate-200 dark:hover:bg-slate-700"
                      }`}
                    >
                      <svg
                        className="h-4 w-4 mr-1 inline"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                        ></path>
                      </svg>
                      Tags
                    </button>
                    <button
                      onClick={() => setActiveSection("actions")}
                      className={`flex-1 px-3 py-2 text-sm rounded-md ${
                        activeSection === "actions"
                          ? "bg-blue-600 text-white"
                          : "hover:bg-slate-200 dark:hover:bg-slate-700"
                      }`}
                    >
                      <svg
                        className="h-4 w-4 mr-1 inline"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        ></path>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        ></path>
                      </svg>
                      More
                    </button>
                  </div>
                </div>

                {/* Post Stats */}
                {(activeSection === "stats" ||
                  (typeof window !== "undefined" &&
                    window.innerWidth >= 1024)) && (
                  <div className="shadow-lg border-0 bg-white/70 backdrop-blur-sm dark:bg-slate-800/70 rounded-xl border py-6">
                    <div className="px-6 pb-3">
                      <div className="text-sm font-medium flex items-center">
                        <svg
                          className="h-4 w-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          ></path>
                        </svg>
                        Writing Stats
                      </div>
                    </div>
                    <div className="px-6 space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600 dark:text-slate-400">
                          Words:
                        </span>
                        <span className="font-medium">{wordCount}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600 dark:text-slate-400">
                          Characters:
                        </span>
                        <span className="font-medium">{charCount}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600 dark:text-slate-400">
                          Reading time:
                        </span>
                        <span className="font-medium">
                          {Math.ceil(wordCount / 200)} min
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tags */}
                {(activeSection === "tags" ||
                  (typeof window !== "undefined" &&
                    window.innerWidth >= 1024)) && (
                  <div className="shadow-lg border-0 bg-white/70 backdrop-blur-sm dark:bg-slate-800/70 rounded-xl border py-6">
                    <div className="px-6 pb-3">
                      <div className="text-sm font-medium flex items-center">
                        <svg
                          className="h-4 w-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                          ></path>
                        </svg>
                        Tags
                      </div>
                    </div>
                    <div className="px-6 space-y-3">
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          placeholder="Add tag..."
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          onKeyPress={handleKeyPress}
                          className="flex-1 px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          onClick={addTag}
                          className="px-3 py-2 text-sm border rounded-md hover:bg-slate-50 dark:hover:bg-slate-800"
                        >
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            ></path>
                          </svg>
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                          <span
                            key={tag.id}
                            className="inline-flex items-center px-2 py-1 text-xs bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-md"
                          >
                            {tag.name}
                            <button
                              onClick={() => removeTag(tag.id)}
                              className="ml-1 hover:text-red-500"
                            >
                              <svg
                                className="h-3 w-3"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M6 18L18 6M6 6l12 12"
                                ></path>
                              </svg>
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Quick Actions */}
                {(activeSection === "actions" ||
                  (typeof window !== "undefined" &&
                    window.innerWidth >= 1024)) && (
                  <div className="shadow-lg border-0 bg-white/70 backdrop-blur-sm dark:bg-slate-800/70 rounded-xl border py-6">
                    <div className="px-6 pb-3">
                      <div className="text-sm font-medium flex items-center">
                        <svg
                          className="h-4 w-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                          ></path>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          ></path>
                        </svg>
                        Quick Actions
                      </div>
                    </div>
                    <div className="px-6 space-y-2">
                      <button className="w-full px-3 py-2 text-sm border rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-start">
                        <svg
                          className="h-4 w-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          ></path>
                        </svg>
                        Schedule Post
                      </button>
                      <button
                        onClick={exportPost}
                        className="w-full px-3 py-2 text-sm border rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-start"
                      >
                        <svg
                          className="h-4 w-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          ></path>
                        </svg>
                        Export Post
                      </button>
                      <button className="w-full px-3 py-2 text-sm border rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-start">
                        <svg
                          className="h-4 w-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                          ></path>
                        </svg>
                        Share Draft
                      </button>
                      <button className="w-full px-3 py-2 text-sm border rounded-md hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-start">
                        <svg
                          className="h-4 w-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          ></path>
                        </svg>
                        Author Settings
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
