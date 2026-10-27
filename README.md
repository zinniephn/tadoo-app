# tadoo-app
To-do webapp for children age 6-9

Tasks are split into Morning, Afternoon and Evening. Checking a task earns a star, and finishing a whole part of the day shows a "Tadoo!" celebration. Everything is saved in the browser (localStorage), and checkboxes reset each new day.

## Run it

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

- `npm run build` – production build in `dist/`
- `npm run lint` – check the code with oxlint

## Where things are

- `src/state/` – task data, starter tasks and the saved state (`useTadoo`)
- `src/components/` – Header, TaskBoard (tabs + list), TaskRow, AddTaskRow, CelebrationModal, NameScreen
- `src/assets/` – icons exported from the Figma design
