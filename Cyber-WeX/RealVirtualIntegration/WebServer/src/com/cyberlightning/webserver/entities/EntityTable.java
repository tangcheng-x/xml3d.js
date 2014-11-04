package com.cyberlightning.webserver.entities;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;

import com.cyberlightning.webserver.StaticResources;


public class EntityTable implements java.io.Serializable {
	
	
	private static final long serialVersionUID = -8536303237731902808L;
	public Map<RowEntry, Entity> entities = new ConcurrentHashMap<RowEntry, Entity>(); 
	
	
	/**
	 * 
	 * @param _entry
	 * @param _entity
	 */
	public void addEntity(RowEntry _entry, Entity _entity) {
		
		if (!this.entities.isEmpty()) {
			Iterator<RowEntry> rows = this.entities.keySet().iterator();
			while (rows.hasNext()) {
				RowEntry row = rows.next();
				if (_entry.entityUUID.contentEquals(row.entityUUID)) {
					_entity = updateValues(this.entities.get(row), _entity);
					this.entities.remove(row);
					this.entities.put(_entry, _entity);
				} else {
					this.entities.put(_entry, _entity);
				}
			}
		} else {
			this.entities.put(_entry, _entity);
		}
	}
	/**
	 * 
	 * @param _old
	 * @param _new
	 * @return
	 */
	private Entity updateValues(Entity _old, Entity _new) {
		for (Sensor sensor: _new.sensors) {
			if(sensor.values != null) {
				CopyOnWriteArrayList<HashMap<String,Object>> values = sensor.values;
				for(Sensor oldSensor : _old.sensors) {
					if (oldSensor.uuid != null && sensor.uuid != null) {
						if (oldSensor.uuid.contentEquals(sensor.uuid)) {
							for (HashMap<String,Object> value: values) {
								if (oldSensor.values.size() < StaticResources.MAX_HISTORY_VALUES_FOR_SENSOR) {
									oldSensor.values.add(value);
								} else {
									oldSensor.values.clear();
									oldSensor.values.add(value);
								}
										
							}
						}
					} else {
						if (((String)oldSensor.attributes.get("type")).contentEquals((String)sensor.attributes.get("type"))) {
							for (HashMap<String,Object> value: values) {
								if (oldSensor.values.size() < StaticResources.MAX_HISTORY_VALUES_FOR_SENSOR) {
									oldSensor.values.add(value);
								} else {
									oldSensor.values.clear();
									oldSensor.values.add(value);
								}
							}
						} else {
							// store in general entity history?
						}
					}
					
				}	
			}
		}
		return _old;
	}
	
	/**
	 * 
	 * @param _entity
	 */
	public void removeEntity(Entity _entity) {
		this.entities.remove(_entity.uuid);
	}
	
	public void clearAll (){
		this.entities.clear();
	}
	/**
	 * 
	 * @param _uuid
	 * @return
	 */
	public Entity getEntity(String _uuid) {
		Iterator<RowEntry> i = this.entities.keySet().iterator();
		Entity entity = null;
		while (i.hasNext()) {
			RowEntry row = i.next();
			if (row.entityUUID.contentEquals(_uuid)) {
				entity = this.entities.get(row);
			}
		}
		return entity;
	}
	
	public void appendOldEntities (Map<RowEntry, Entity> _entities) {
		Iterator<RowEntry> rows = _entities.keySet().iterator();
		while (rows.hasNext()) {
			RowEntry row = rows.next();
			this.addEntity(row, _entities.get(row));
		}
	}
	
	

}
