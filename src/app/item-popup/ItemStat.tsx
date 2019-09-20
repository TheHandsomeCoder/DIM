import React from 'react';
import { DimStat, DimItem, D1Stat } from 'app/inventory/item-types';
import { statsMs } from 'app/inventory/store/stats';
import RecoilStat from './RecoilStat';
import { percent, getColor } from 'app/shell/filters';
import classNames from 'classnames';
import { t } from 'app/i18next-t';
import BungieImage from 'app/dim-ui/BungieImage';

/**
 * A single stat line.
 */
export default function ItemStat({ stat, item }: { stat: DimStat; item: DimItem }) {
  const value = stat.value;
  const isMasterworkedStat =
    item.isDestiny2() && item.masterworkInfo && stat.statHash === item.masterworkInfo.statHash;
  const masterworkValue =
    (item.isDestiny2() && item.masterworkInfo && item.masterworkInfo.statValue) || 0;

  let baseBar = value;
  if (isMasterworkedStat && masterworkValue > 0) {
    baseBar -= masterworkValue;
  }

  const segments: [number, string?][] = [[baseBar]];

  if (isMasterworkedStat && masterworkValue > 0) {
    segments.push([masterworkValue, 'masterwork-stats']);
  }

  const displayValue = statsMs.includes(stat.statHash) ? t('Stats.Milliseconds', { value }) : value;

  return (
    <div className="stat-box-row" title={stat.displayProperties.description}>
      <span
        className={classNames('stat-box-text', 'stat-box-cell', {
          'stat-box-masterwork': isMasterworkedStat
        })}
      >
        {stat.displayProperties.name}
      </span>

      {stat.statHash === 2715839340 ? (
        <span className="stat-recoil">
          <RecoilStat stat={stat} />
          {value}
        </span>
      ) : (
        <span className={classNames('stat-box-outer', { 'stat-box-outer--no-bar': !stat.bar })}>
          <span className="stat-box-container">
            {stat.bar
              ? segments.map(([val, className], index) => (
                  <span
                    key={index}
                    className={classNames('stat-box-inner', className)}
                    style={{ width: percent(val / stat.maximumValue) }}
                  />
                ))
              : displayValue}
          </span>
        </span>
      )}

      {stat.bar && (
        <span className="stat-box-val stat-box-cell">
          {displayValue}
          {stat.displayProperties.hasIcon && (
            <BungieImage className="stat-icon" src={stat.displayProperties.icon} />
          )}
          {isD1Stat(item, stat) && stat.qualityPercentage && stat.qualityPercentage.min && (
            <span
              className="item-stat-quality"
              style={getColor(stat.qualityPercentage.min, 'color')}
            >
              ({stat.qualityPercentage.range})
            </span>
          )}
        </span>
      )}
    </div>
  );
}

function isD1Stat(item: DimItem, _stat: DimStat): _stat is D1Stat {
  return item.isDestiny1();
}