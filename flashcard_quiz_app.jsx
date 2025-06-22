import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const FlashcardApp = () => {
  const [flashcards, setFlashcards] = useState([
    { question: "What is the capital of France?", answer: "Paris" },
    { question: "What is 2 + 2?", answer: "4" },
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCard, setEditedCard] = useState({ question: "", answer: "" });

  const currentCard = flashcards[currentIndex];

  const handleNext = () => {
    setShowAnswer(false);
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
  };

  const handlePrevious = () => {
    setShowAnswer(false);
    setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  const handleAddCard = () => {
    const newCard = { question: "New Question", answer: "New Answer" };
    setFlashcards([...flashcards, newCard]);
    setCurrentIndex(flashcards.length);
  };

  const handleEditCard = () => {
    const updatedCards = [...flashcards];
    updatedCards[currentIndex] = editedCard;
    setFlashcards(updatedCards);
    setIsEditing(false);
  };

  const handleDeleteCard = () => {
    const updatedCards = flashcards.filter((_, idx) => idx !== currentIndex);
    setFlashcards(updatedCards);
    setCurrentIndex(0);
    setShowAnswer(false);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4">
      <Card>
        <CardContent className="text-center p-6">
          {isEditing ? (
            <div className="space-y-4">
              <input
                type="text"
                className="w-full border rounded p-2"
                value={editedCard.question}
                onChange={(e) =>
                  setEditedCard({ ...editedCard, question: e.target.value })
                }
                placeholder="Question"
              />
              <input
                type="text"
                className="w-full border rounded p-2"
                value={editedCard.answer}
                onChange={(e) =>
                  setEditedCard({ ...editedCard, answer: e.target.value })
                }
                placeholder="Answer"
              />
              <Button onClick={handleEditCard}>Save</Button>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-semibold mb-4">
                {currentCard?.question || "No flashcards available"}
              </h2>
              {showAnswer && <p className="text-lg mb-4">{currentCard?.answer}</p>}
              {currentCard && (
                <Button onClick={() => setShowAnswer(!showAnswer)} className="mb-4">
                  {showAnswer ? "Hide Answer" : "Show Answer"}
                </Button>
              )}
            </>
          )}
          <div className="flex justify-between space-x-2 mt-4">
            <Button onClick={handlePrevious} disabled={flashcards.length === 0}>Previous</Button>
            <Button onClick={handleNext} disabled={flashcards.length === 0}>Next</Button>
          </div>
          <div className="flex justify-between space-x-2 mt-4">
            <Button onClick={handleAddCard}>Add</Button>
            <Button
              onClick={() => {
                setIsEditing(true);
                setEditedCard(currentCard);
              }}
              disabled={flashcards.length === 0}
            >
              Edit
            </Button>
            <Button onClick={handleDeleteCard} disabled={flashcards.length === 0}>Delete</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FlashcardApp;
