import { Reducer } from 'redux'
import produce from 'immer'
import { sortBy } from './util'
import { CardID, ColumnID } from './api'

export type State = {
  filterValue: string
  columns?: {
    id: ColumnID
    title?: string
    text?: string
    cards?: {
      id: CardID
      test?: string
    }[]
  }[]
  cardsOrder: Record<string, CardID | ColumnID | null>
}

const initialState: State = {
  filterValue: '',
  cardsOrder: {},
}

// 共用体型として定義。パイプで繋いだうちのどれかに該当する型を表す。
export type Action =
  | {
      type: 'Filter.SetFilter'
      payload: {
        value: string
      }
    }
  | {
      type: 'App.SetColumns'
      payload: {
        columns: {
          id: ColumnID
          title?: string
          text?: string
        }[]
      }
    }
  | {
      type: 'App.SetCards'
      payload: {
        cards: {
          id: CardID
          text?: string
        }[]
        cardsOrder: Record<string, CardID | ColumnID | null>
      }
    }

export const reducer: Reducer<State, Action> = produce(
  (draft: State, action: Action) => {
    switch (action.type) {
      case 'Filter.SetFilter': {
        const { value } = action.payload

        draft.filterValue = value
        return
      }

      case 'App.SetColumns': {
        const { columns } = action.payload

        draft.columns = columns
        return
      }

      case 'App.SetCards': {
        const { cards: unorderedCards, cardsOrder } = action.payload

        draft.cardsOrder = cardsOrder
        draft.columns?.forEach(column => {
          column.cards = sortBy(unorderedCards, cardsOrder, column.id)
        })
        return
      }

      // switch文のcaseがすべてのaction.typeを網羅していることを型検査で検出するために必要
      default: {
        const _: never = action
      }
    }
  },
  initialState,
)
