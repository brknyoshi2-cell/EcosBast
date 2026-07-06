const FichasStorage = (function () {
  const PREFIX = 'retalhos-contracena:';

  function isBlankPrint() {
    return new URLSearchParams(window.location.search).get('print') === 'blank';
  }

  function collect(container) {
    const data = {};
    container.querySelectorAll('[data-field]').forEach(function (el) {
      const key = el.getAttribute('data-field');
      if (el.type === 'checkbox') {
        data[key] = el.checked;
      } else {
        data[key] = el.value;
      }
    });
    return data;
  }

  function apply(container, data) {
    if (!data) return;
    container.querySelectorAll('[data-field]').forEach(function (el) {
      const key = el.getAttribute('data-field');
      if (!(key in data)) return;
      if (el.type === 'checkbox') {
        el.checked = !!data[key];
      } else {
        el.value = data[key];
      }
    });
  }

  function clearFields(container) {
    container.querySelectorAll('[data-field]').forEach(function (el) {
      if (el.type === 'checkbox') {
        el.checked = false;
      } else {
        el.value = '';
      }
    });
  }

  function saveFixed(key, container) {
    const data = collect(container);
    localStorage.setItem(PREFIX + 'fixa:' + key, JSON.stringify(data));
    return data;
  }

  function loadFixed(key, container) {
    const raw = localStorage.getItem(PREFIX + 'fixa:' + key);
    if (!raw) return null;
    const data = JSON.parse(raw);
    apply(container, data);
    return data;
  }

  function listIndexKey(type) {
    return PREFIX + 'lista:' + type;
  }

  function getList(type) {
    const raw = localStorage.getItem(listIndexKey(type));
    return raw ? JSON.parse(raw) : [];
  }

  function saveListIndex(type, list) {
    localStorage.setItem(listIndexKey(type), JSON.stringify(list));
  }

  function saveItem(type, id, nome, container) {
    const data = collect(container);
    localStorage.setItem(PREFIX + 'item:' + type + ':' + id, JSON.stringify(data));

    const list = getList(type);
    const existing = list.find(function (i) { return i.id === id; });
    const entry = {
      id: id,
      nome: nome && nome.trim() ? nome.trim() : '(sem nome)',
      atualizado: new Date().toISOString()
    };
    if (existing) {
      existing.nome = entry.nome;
      existing.atualizado = entry.atualizado;
    } else {
      list.push(entry);
    }
    saveListIndex(type, list);
    return data;
  }

  function loadItem(type, id, container) {
    const raw = localStorage.getItem(PREFIX + 'item:' + type + ':' + id);
    if (!raw) return null;
    const data = JSON.parse(raw);
    apply(container, data);
    return data;
  }

  function deleteItem(type, id) {
    localStorage.removeItem(PREFIX + 'item:' + type + ':' + id);
    const list = getList(type).filter(function (i) { return i.id !== id; });
    saveListIndex(type, list);
  }

  function newId() {
    return 'id-' + Date.now() + '-' + Math.random().toString(36).slice(2, 8);
  }

  function abrirImpressaoEmBranco() {
    const url = window.location.pathname + '?print=blank';
    const janela = window.open(url, '_blank');
    return janela;
  }

  return {
    isBlankPrint: isBlankPrint,
    collect: collect,
    apply: apply,
    clearFields: clearFields,
    saveFixed: saveFixed,
    loadFixed: loadFixed,
    getList: getList,
    saveItem: saveItem,
    loadItem: loadItem,
    deleteItem: deleteItem,
    newId: newId,
    abrirImpressaoEmBranco: abrirImpressaoEmBranco
  };
})();
