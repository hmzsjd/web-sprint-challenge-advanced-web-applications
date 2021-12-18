import React from 'react';
import '@testing-library/jest-dom';

import userEvent from '@testing-library/user-event';
import MutationObserver from 'mutationobserver-shim';
import {render, screen} from "@testing-library/react";

import Article from './Article';

const testArticle = {
    id: 12345,
    headline: "LOREM IPSUM",
    createdOn: Date.now(),
    author:"LOREM",
    image: 1,
    summary: "LIDSA",
    body: "LOREM IPSUM DOLOR SIT AMET"   
};


const noAuth = {
    id: 12345,
    headline: "LOREM IPSUM",
    createdOn: Date.now(),
    author:"",
    image: 1,
    summary: "LIDSA",
    body: "LOREM IPSUM DOLOR SIT AMET"   
};

test('renders component without errors', ()=> {
    render(<Article key={testArticle.id} article={testArticle} />)
});

test('renders headline, author from the article when passed in through props', ()=> {

    render(<Article key={testArticle.id} article={testArticle}/>)

    const tHeadline = screen.getByTestId('headline');
    expect(tHeadline).toBeInTheDocument();

    const tAuthor = screen.getByTestId('author');
    expect(tAuthor).toBeInTheDocument();

    const tSummary = screen.getByTestId('summary');
    expect(tSummary).toBeInTheDocument();

    const tBody = screen.getByTestId('body');
    expect(tBody).toBeInTheDocument();


});

test('renders "Associated Press" when no author is given', ()=> {

    render(<Article key={noAuth.id} article={noAuth}/>)

    const apAuthor = screen.getByText(/Associated Press/i);

    expect(apAuthor).toBeTruthy();
    expect(apAuthor).toBeInTheDocument();



});

test('executes handleDelete when the delete button is pressed', ()=> {

    const deleteTester = jest.fn();

    render(<Article article={testArticle} handleDelete={deleteTester}/>);

    const button = screen.queryByTestId('deleteButton');

    userEvent.click(button);

    expect(deleteTester).toHaveBeenCalled();

    
});

//Task List: 
//1. Complete all above tests. Create test article data when needed.