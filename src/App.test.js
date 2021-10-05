import React from 'react'
import App from './App'
import { render, fireEvent, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'


describe('App', () => {
  beforeAll(() => {
    delete window.matchMedia
    window.matchMedia = (query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })
  });

  describe('With Valid Inputs', () => {
    it('Inputs Valids', async () => {
      const mockOnSubmit = jest.fn()
      const { getByRole, getByPlaceholderText } = render(<App onSubmit={mockOnSubmit} />)

      await act(async () => {
        fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'mail@test.com' } })
        fireEvent.change(getByPlaceholderText('Password'), { target: { value: '12345678' } })
      })

      await act(async () => {
        fireEvent.click(getByRole('button'))
      })

      expect(mockOnSubmit).toHaveBeenCalled()
    })
    it('Email Invalid', async () => {
      const mockOnSubmit = jest.fn()
      const { getByRole, getByPlaceholderText } = render(<App onSubmit={mockOnSubmit} />)

      await act(async () => {
        fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'mail test' } })
        fireEvent.change(getByPlaceholderText('Password'), { target: { value: '12345678' } })
      })

      await act(async () => {
        fireEvent.click(getByRole('button'))
      })

      expect(await screen.findByText('Digite um e-mail válido!')).toBeInTheDocument()
      expect(mockOnSubmit).not.toHaveBeenCalled()

    });
  })
})