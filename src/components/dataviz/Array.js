// @flow strict
import React from 'react'
import PropTypes from 'prop-types'
import { Map, List, Record } from 'immutable'
import type { RecordFactory, RecordOf } from 'immutable'
import { StyleSheet, css } from 'aphrodite/no-important'

import VarStylesContext from '../../VarStylesContext'

type GlobalsProps = {A: List<number>}
export const makeGlobals: RecordFactory<GlobalsProps> = Record({A: List()})
export type Globals = RecordOf<GlobalsProps>

const variablesToClassname = (currentIndex: number, variables: Globals): string =>
  variables.toSeq().filter((value: mixed) => value === currentIndex).keySeq().sort().join()

type GlobalsProps2 = {A: List<number>, value: number}
export const makeGlobals2: RecordFactory<GlobalsProps2> = Record({A: List(), value: 0})
export type Globals2 = RecordOf<GlobalsProps2>

const g = makeGlobals2()
variablesToClassname(0, (g: Globals))

const Array = ({ variables, changeGlobals }: Props) => {
  return (
    <VarStylesContext.Consumer>
      {varStyles => (
        <div className={css(styles.array)}>
          {
            variables.get('A').map((item, index) =>
              <div className={css(styles.item, varStyles[variablesToClassname(index, variables)])} key={index}>
                {item}
                <div className={css(styles.itemDelete)} onClick={() => changeGlobals({A: variables.get('A').remove(index)})}/>
              </div>
            )
          }
        </div>
      )}
    </VarStylesContext.Consumer>
  )
}

type Props = {
  variables: Map<string, string>,
  changeGlobals: ({A: List<number>}) => void,
  varStyles: Map<string, string>
}

const styles = StyleSheet.create({
  array: {
    display: 'flex',
    flexFlow: 'row wrap',
  },
  item: {
    position: 'relative',
    fontFamily: ['Inconsolata', 'monospace'],
    padding: '5px',
    border: '1px solid black',
    margin: '5px',
    maxHeight: '22px'
  },
  itemDelete: {
    padding: 0,
    backgroundColor: 'red',
    cursor: 'pointer',
    width: '7px',
    height: '7px',
    right: '0',
    top: '0',
    position: 'absolute'
  }
})

export default Array
