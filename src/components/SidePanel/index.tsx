import React, { FC } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { StyleProps, colors } from '../../styles'
import { SuperHero } from '../../core'
import { Typography } from '@material-ui/core'
import cx from 'classnames'
import { BsArrowBarLeft, BsFillBookmarkFill } from 'react-icons/bs'
import { PowerStat } from '../PowerStat'

interface Props extends StyleProps {
  selectedHero: SuperHero,
  onClose: () => void,
  myList: Record<string, SuperHero>,
  addToList: (superhero: SuperHero) => void,
}

export const SidePanel: FC<Props> = ({ selectedHero, onClose, myList, addToList, style }) => {
  const classes = useStyles()
  return (
    <div
      className={classes.sidePanel}
      style={{
        transform: selectedHero?.name ? 'translateX(0%)' : 'translateX(100%)',
        ...style
      }}
    >
      <div className={classes.sidePanelHeader}>
        <BsArrowBarLeft
          className={classes.backButton}
          size={25}
          color={colors.white}
          onClick={() => onClose()}
        />
      </div>
      <div
        className={classes.selectedHeroDetails}
        style={{
          backgroundImage: `url(${selectedHero?.image?.url || ''})`
        }}
      >
        <div className={cx(classes.heroDetails, classes.heroDetailsLarge)}>
          <Typography className={classes.selectedHeroName}>{selectedHero?.name}</Typography>
            <BsFillBookmarkFill
            onClick={() => addToList(selectedHero)}
            size={22}
            color={!!myList[selectedHero.id] ? colors.red : colors.grey}
          />
        </div>

        <div className={classes.sectionDetailsWrapper}>
          <div className={classes.sectionRow}>
            <PowerStat label={'Combat'} value={selectedHero?.powerstats?.['combat']} />
            <PowerStat label={'Durability'} value={selectedHero?.powerstats?.['durability']} />
            <PowerStat label={'Intelligence'} value={selectedHero?.powerstats?.['intelligence']} />
            <PowerStat label={'Power'} value={selectedHero?.powerstats?.['power']} />
            <PowerStat label={'Speed'} value={selectedHero?.powerstats?.['speed']} />
            <PowerStat label={'Strength'} value={selectedHero?.powerstats?.['strength']} />
          </div>
          <div className={classes.moreDetailsSection}>
            <div className={classes.sectionCol}>
              <Typography className={cx(classes.sectionTitle, classes.sectionTitleSub)}>Apperance</Typography>
              <Typography className={classes.sectionDetails}><strong className={classes.heroAttr}>Gender</strong>{selectedHero?.appearance?.['gender'] || 'N/A'}</Typography>
              <Typography className={classes.sectionDetails}><strong className={classes.heroAttr}>Height</strong>{selectedHero?.appearance?.['height'] || 'N/A'}</Typography>
              <Typography className={classes.sectionDetails}><strong className={classes.heroAttr}>Weight</strong>{selectedHero?.appearance?.['weight'].map((item: string) => item)}</Typography>
              <Typography className={classes.sectionDetails}><strong className={classes.heroAttr}>Eye Color</strong>{selectedHero?.appearance?.['eye-color'] || 'N/A'}</Typography>
              <Typography className={classes.sectionDetails}><strong className={classes.heroAttr}>Hair Color</strong>{selectedHero?.appearance?.['hair-color'] || 'N/A'}</Typography>
            </div>
            <div className={classes.sectionCol}>
              <Typography className={classes.sectionTitle}>Biography</Typography>
              <Typography className={classes.sectionDetails}><strong className={classes.heroAttr}>Full Name</strong>{selectedHero?.biography?.['full-name'] || 'N/A'}</Typography>
              <Typography className={classes.sectionDetails}><strong className={classes.heroAttr}>Place of Birth</strong>{selectedHero?.biography?.['place-of-birth'] || 'N/A'}</Typography>
              <Typography className={classes.sectionDetails}><strong className={classes.heroAttr}>Alter Egos</strong>{selectedHero?.biography?.['alter-egos'] || 'N/A'}</Typography>
              <Typography className={classes.sectionDetails}><strong className={classes.heroAttr}>Aliases</strong>{selectedHero?.biography?.['aliases'].map((item: string) => item)}</Typography>
              <Typography className={classes.sectionDetails}><strong className={classes.heroAttr}>First Appearance</strong>{selectedHero?.biography?.['first-appearance'] || 'N/A'}</Typography>
              <Typography className={classes.sectionDetails}><strong className={classes.heroAttr}>Publisher</strong>{selectedHero?.biography?.['publisher'] || 'N/A'}</Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  heroDetails: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    background: 'linear-gradient(to bottom, transparent 5%, black 60%)',
    padding: '20px 10px',
    paddingTop: 54,
    borderBottomRightRadius: 14,
    borderBottomLeftRadius: 14,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heroDetailsLarge: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    paddingLeft: 18,
    paddingBottom: 16,
  },
  sidePanel: {
    position: 'absolute',
    height: 'calc(100vh - 86px)',
    width: '55%',
    overflowY: 'scroll',
    top: 86,
    bottom: 0,
    right: 0,
    zIndex: 4,
    transition: '0.3s ease-out',
    backgroundColor: colors.black,
    boxShadow: '-10px 0px 10px rgba(0, 0, 0, 0.2)',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    }
  },
  sidePanelHeader: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 0,
  },
  backButton: {
    position: 'absolute',
    left: 15,
    top: 10,
    zIndex: 99,
    cursor: 'pointer'
  },
  selectedHeroDetails: {
    height: '50vh',
    width: '100%',
    backgroundSize: 'cover',
    position: 'relative',
  },
  selectedHeroName: {
    fontSize: 36,
    color: colors.white,
    fontWeight: 600
  },
  sectionTitle: {
    fontSize: 23,
    color: colors.red,
    paddingBottom: 10,
    fontWeight: 500
  },
  sectionTitleSub: {
    paddingTop: 24
  },
  sectionDetailsWrapper: {
    padding: '0px 18px',
    paddingTop: '50vh',
    paddingBottom: 166
  },
  sectionDetails: {
    color: colors.white,
    fontSize: 19,
    paddingLeft: 12
  },
  sectionDetailsStat: {
    color: colors.red,
    fontSize: 22,
  },
  moreDetailsSection: {
    display: 'flex',
    gap: 32,
    alignItems: 'baseline'
  },
  sectionCol: {
    display: 'flex',
    flexDirection: 'column',
  },
  sectionRow: {
    display: 'flex',
    gap: 20,
    flexWrap: 'wrap'
  },
  heroAttr: {
    color: colors.red,
    fontWeight: 500,
    paddingRight: 8
  }
}))

export default SidePanel